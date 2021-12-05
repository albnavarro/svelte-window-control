let mouseMoveInitialized = false;
let mouseMoveCallback = [];
let mouseMoveId = 0;

function handlerMouseMove(e) {
    if (mouseMoveCallback.length === 0) {
        window.removeEventListener('mousemove', handlerMouseMove);
        mouseMoveInitialized = false;
    }

    const { pageX, pageY } = e;
    const { clientX, clientY } = e;
    const target = e.target;

    mouseMoveCallback.forEach(({ cb }) => {
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

function initMouseMove() {
    if (mouseMoveInitialized) return;
    mouseMoveInitialized = true;

    window.addEventListener('mousemove', handlerMouseMove);
}

export const useMouseMove = (cb) => {
    mouseMoveCallback.push({ cb, id: mouseMoveId });
    const cbId = mouseMoveId;
    mouseMoveId++;

    if (typeof window !== 'undefined') {
        initMouseMove();
    }

    return () => {
        mouseMoveCallback = mouseMoveCallback.filter(
            (item) => item.id !== cbId
        );
    };
};
