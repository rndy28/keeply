import { useEffect } from "react";

/**
 *
 * @param ref textbox ref object
 * @param input used to assign textbox value
 * @param cb used to modify textbox value (optional)
 */
export const useFocus = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  input: string,
  cb?: (input: string) => string
) => {
  useEffect(() => {
    if (!input) return;
    if (ref && ref.current) {
      ref.current.textContent = typeof cb === "function" ? cb(input) : input;

      const range = document.createRange();
      const selection = window.getSelection();
      range.setStart(ref.current.childNodes[0], ref.current.textContent.length);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      ref.current.focus();
    }
  }, [input]);
};
