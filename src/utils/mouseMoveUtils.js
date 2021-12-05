/**
 * Utils to centralize mouse move listener, all subscriber use the same listener
 * First subscriber create a listener, when there are no more listeners the listern is removed
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

    /**
     * handlerMouseMove - handler for mouse move
     *
     * @param  {event} e mouse move event
     * @return {void}   description
     */
    function handlerMouseMove(e) {
        /**
         * if - if there is no subscritor remove handler
         */
        if (callback.length === 0) {
            window.removeEventListener('mousemove', handlerMouseMove);
            inizialized = false;
        }

        const { pageX, pageY } = e;
        const { clientX, clientY } = e;
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
            });
        });
    }

    /**
     * initMouseMove - if istener is not inizializad remove it
     *
     * @return {void}
     */
    function initMouseMove() {
        if (inizialized) return;
        inizialized = true;

        window.addEventListener('mousemove', handlerMouseMove);
    }

    /**
     * initMouseMove - add call back to stack
     *
     * @return {function} unsubscribe function
     */
    const addCb = (cb) => {
        callback.push({ cb, id: id });
        const cbId = id;
        id++;

        if (typeof window !== 'undefined') {
            initMouseMove();
        }

        return () => {
            callback = callback.filter((item) => item.id !== cbId);
        };
    };

    return addCb;
})();
