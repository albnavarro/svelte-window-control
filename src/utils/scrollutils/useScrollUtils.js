import { useScroll } from './useScroll.js';

/**
 * Same of useScroll but trigger scrollEnd and scrollStart event
 *
 */

function useScrollUtils(type) {
    let inizialized = false;
    let callback = [];
    let id = 0;
    let isScrolling = false;
    let unsubscribeScroll = () => {};
    let debouceFunctionReference = () => {};

    // Debounce Function to detect end of scroll
    const debounceFuncion = function debounce(fn, time = 200) {
      let timeout;

      return function() {
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
      }
    }


    /**
     * handler - handler for scroll debounce
     *
     * @param  {event} e mouse move event
     * @return {void}   description
     */
    function handler(e) {
        isScrolling = false;

        /**
         * if - if there is no subscritor remove handler
         */
        if (callback.length === 0) {
            window.removeEventListener('scroll', debouceFunctionReference);

            // Unsubscribe from scroll callback
            if( type === 'START') {
                unsubscribeScroll();
            }

            inizialized = false;
            return;
        }


        // Prepare data to callback
        const scrollData = {
            scrolY: window.pageYOffset
        };

        // Fire end fo scroll
        if (type === 'END') {
            callback.forEach(({ cb }) => {
                cb(scrollData);
            });
        }
    }

    /**
     * init - if istener is not inizializad remove it
     *
     * @return {void}
     */
    function init() {
        if (inizialized) return;
        inizialized = true;

        // Add debunce function to detect scroll end
        debouceFunctionReference = debounceFuncion((e) =>  handler(e));
        window.addEventListener('scroll', debouceFunctionReference, { passive: false, });

        // Use normal scroll event ( no debuonce ) to detect if page is scrolling
        if( type === 'START') {
            unsubscribeScroll = useScroll(() => {
                const scrollData = {
                    scrolY: window.pageYOffset
                };

                // At first scroll isScrolling is false
                // Fire event ad set isScrolling to true
                // At debounce end isScrolling return to false to trigger next scroll
                if (!isScrolling) {
                    isScrolling = true;

                    callback.forEach(({ cb }) => {
                        cb(scrollData);
                    });
                }
            })
        }
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

export const useScrollStart = new useScrollUtils('START')
export const useScrollEnd = new useScrollUtils('END')
