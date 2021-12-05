export const useFrame = (() => {
    let inizialized = false;
    let callback = [];

    const render = () => {
        /**
         * if - exit form RAF if callback queque is empty
         */
        if (callback.length === 0) {
            inizialized = false;
            return;
        }

        /**
         * Ececute callback
         */
        callback.forEach((item) => {
            item();
        });

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

        requestAnimationFrame(render);
    };

    /**
     *  Add callback
     */
    const addCb = (cb) => {
        if (typeof window !== 'undefined') {
            callback.push(cb);
            initFrame();
        }
    };

    return addCb;
})();
