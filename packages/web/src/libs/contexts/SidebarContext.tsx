import { useOutsideClick } from "libs/hooks/useOutsideClick";
import { createCtx } from "libs/utils/createContext";
import { RefObject, useCallback, useMemo, useRef, useState } from "react";

interface SidebarContextT {
  onToggle: () => void;
  onClose: () => void;
  expanded: boolean;
  sidebarRef: RefObject<HTMLElement> | null;
}

const [useSidebar, Provider] = createCtx<SidebarContextT>();

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const sidebarRef = useRef<HTMLElement | null>(null);

  const onToggle = useCallback(() => {
    if (window.innerWidth > 800) {
      setExpanded((c) => !c);
    } else {
      setExpanded(true);
    }
  }, [expanded]);

  const onClose = () => setExpanded(false);

  useOutsideClick(sidebarRef, (target) => {
    if (window.innerWidth > 850) return;

    if (!sidebarRef.current || sidebarRef.current.contains(target as Node)) return;

    if (target.classList.contains("hamburger") || target.classList.contains("hamburger-icon"))
      return;

    setExpanded(false);
  });

  const value = useMemo(() => ({ onClose, onToggle, expanded, sidebarRef }), [expanded]);

  return <Provider value={value}>{children}</Provider>;
};

export { useSidebar, SidebarProvider };
