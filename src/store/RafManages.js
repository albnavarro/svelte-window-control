let inizialized = false;
let callback = [];

const render = () => {
    if (callback.length === 0) {
        inizialized = false;
        return;
    }

    console.log('frame running');
    callback.forEach((item, i) => {
        item();
    });

    callback = [];

    requestAnimationFrame(render);
};

const initFrame = () => {
    if (inizialized === true) return;
    inizialized = true;

    requestAnimationFrame(render);
};

export const useFrame = (fn) => {
    callback.push(fn);
    initFrame();
};
