import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";

export function useOutsideClick({ close, listenCapturing = true }) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [close, listenCapturing]);

  return ref;
}

useOutsideClick.propTypes = {
  close: PropTypes.func,
  listenCapturing: PropTypes.bool,
};
