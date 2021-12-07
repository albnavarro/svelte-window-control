/**
 * util to centralize all action in one Request Animation Frame,
 * All subsciber use the same frame
 * useFrame run once then delete all subscriber
 *
 * @example:
 * useFrame(() => {
 *     myFunction()
 * });
 *
 */

export const useFrame = (() => {
    let inizialized = false;
    let callback = [];

    // Get 60 fps per seconds
    let framRate = 60;
    let now;
    let then;
    let fpsInterval = 1000 / framRate;

    // Get right time if server side or client side
    const getTime = () => {
        const is_client = typeof window !== 'undefined';
        return is_client ? window.performance.now() : Date.now();
    };

    const render = () => {
        /**
         * if - exit form RAF if callback queque is empty
         */
        if (callback.length === 0) {
            inizialized = false;
            return;
        }

        // Refresh date for fps
        now = getTime();
        const elapsed = now - then;

        // If 60 fps
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            /**
             * Ececute callback
             */
            callback.forEach((item) => {
                item();
            });
        }

        /**
         * Cler Callback
         */
        callback = [];

        /**
         * Next frame
         */
        requestAnimationFrame(render);
    };

    /**
     * Init new frame if is not running
     */
    const initFrame = () => {
        if (inizialized === true) return;
        inizialized = true;
        then = getTime();

        requestAnimationFrame(render);
    };

    /**
     *  Add callback
     */
    const addCb = (cb, fps = 60) => {
        framRate = fps;
        fpsInterval = 1000 / framRate;
        callback.push(cb);
        initFrame();
    };

    return addCb;
})();
