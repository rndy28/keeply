import { useEffect } from "react";

export const useOutsideClick = <RefType extends HTMLElement>(
  ref: React.RefObject<RefType>,
  callback: (target: HTMLElement) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!ref.current || ref.current.contains(target as Node)) return;

      callback(target);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};
