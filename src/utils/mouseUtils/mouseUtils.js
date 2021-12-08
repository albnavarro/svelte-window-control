/**
 * Utils to centralize mouse move listener, all subscriber use the same listener
 * First subscriber create a listener, when there are no more listeners the listern is removed
 *
 * NOTE:
 * Use it inside onMount function to be sure callback is added after first rendering in case of server side rendering
 * https://svelte.dev/tutorial/onmount
 *
 * @example:
 * onMount(() => {
 *   const unsubscribe = useMouseMove(({client}) => console.log(client.x));
 *   return(() => unsubscribe())
 * }
 *
 */

export function useMouse(events = []) {
    let inizialized = false;
    let callback = [];
    let id = 0;

    /**
     * handler - handler for mouse move
     *
     * @param  {event} e mouse move event
     * @return {void}   description
     */
    function handler(e) {
        /**
         * if - if there is no subscritor remove handler
         */
        if (callback.length === 0) {
            events.forEach((item, i) => {
                window.removeEventListener(item, handler);
            });
            inizialized = false;
            return;
        }

        // Get event type
        const type = e.type

        // Get page coord
        const { pageX, pageY } = (() => {

            // 'touchend'
            if (type === 'touchend' && e.changedTouches)
                return e.changedTouches[0];

            // 'mousedown', 'touchstart', 'mousemove', 'touchmove', 'mouseup'
            return e.touches ? e.touches[0] : e;
        })();

        // Get client coord
        const { clientX, clientY } = (() => {
            // 'touchend'
            if (type === 'touchend' && e.changedTouches)
                return e.changedTouches[0];

            // 'mousedown', 'touchstart', 'mousemove', 'touchmove', 'mouseup'
            return e.touches ? e.touches[0] : e;
        })();

        // Get target
        const target = e.target;

        callback.forEach(({ cb }) => {
            cb({
                page: {
                    x: pageX,
                    y: pageY,
                },
                client: {
                    x: clientX,
                    y: clientY,
                },
                target,
                type,
            });
        });
    }

    /**
     * init - if istener is not inizializad remove it
     *
     * @return {void}
     */
    function init() {
        if (inizialized) return;
        inizialized = true;

        events.forEach((item, i) => {
            window.addEventListener(item, handler);
        });
    }

    /**
     * init - add call back to stack
     *
     * @return {function} unsubscribe function
     */
    const addCb = (cb) => {
        callback.push({ cb, id: id });
        const cbId = id;
        id++;

        if (typeof window !== 'undefined') {
            init();
        }

        return () => {
            callback = callback.filter((item) => item.id !== cbId);
        };
    };

    return addCb;
}
