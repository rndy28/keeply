import { LabelsFormModal, NoteFormModal, WarningModal } from "components/UI/organism/modals";
import { AnimatePresence } from "framer-motion";
import { createCtx } from "libs/utils/createContext";
import { useEffect, useState } from "react";

interface ModalContextT {
  onModalOpen: (name: MODAL_NAME, props?: any) => void;
  onModalClose: () => void;
}

const [useModal, Provider] = createCtx<ModalContextT>();

type MODAL_NAME = "LABELS" | "NOTE" | "WARNING";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ modalName, props }, setModalState] = useState<{
    modalName?: MODAL_NAME;
    props: any;
  }>({
    modalName: undefined,
    props: {},
  });

  const onModalOpen = (name: MODAL_NAME, props?: any) => {
    setModalState({ modalName: name, props });
  };

  const onModalClose = () => {
    setModalState({ modalName: undefined, props: {} });
  };

  useEffect(() => {
    if (typeof modalName !== "undefined") {
      document.body.classList.add("modal-exist");
    } else {
      document.body.classList.remove("modal-exist");
    }
  }, [modalName]);

  return (
    <Provider value={{ onModalClose, onModalOpen }}>
      {children}
      <AnimatePresence>
        {modalName === "NOTE" && <NoteFormModal {...props} />}
        {modalName === "LABELS" && <LabelsFormModal {...props} />}
        {modalName === "WARNING" && <WarningModal {...props} />}
      </AnimatePresence>
    </Provider>
  );
};

export { useModal, ModalProvider };
