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

export const useMouseMove = (() => {
    let inizialized = false;
    let callback = [];
    let id = 0;

    const TOUCH = 'TOUCH';
    const MOUSE = 'MOUSE';

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
            window.removeEventListener('mousemove', handler);
            window.removeEventListener('touchmove', handler);
            inizialized = false;
        }

        const { pageX, pageY } = e.touches ? e.touches[0] : e;
        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        const target = e.target;
        const type = e.touches ? TOUCH : MOUSE;

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

        window.addEventListener('mousemove', handler);
        window.addEventListener('touchmove', handler);
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
})();
