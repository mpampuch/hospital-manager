import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current?.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing); // The true is for capturing the event in the capturing phase to avoid event bubbling and closing the modal window when trying to open it
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
