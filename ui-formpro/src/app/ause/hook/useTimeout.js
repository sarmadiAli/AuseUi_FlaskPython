import { useEffect, useRef } from 'react'

function useTimeout(callback, delay) {
    console.log("callback", callback)

    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay && callback && typeof callback === 'function') {
            console.log("callbackRef", callbackRef);

            let timer = setTimeout(callbackRef.current, delay || 0);

            console.log("timer", timer)
            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
        }
    }, [callback, delay]);
}

export default useTimeout;
