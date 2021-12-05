let inizialized = false;
let callback = [];

const render = () => {
    /**
     * if - exit form RAF if callback queque is empty
     *
     * @param  {type} callback.length === 0 description
     * @return {type}                       description
     */
    if (callback.length === 0) {
        inizialized = false;
        return;
    }

    /**
     * Ececute callback
     */
    callback.forEach((item, i) => {
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
export const useFrame = (fn) => {
    if (typeof window !== 'undefined') {
        callback.push(fn);
        initFrame();
    }
};
