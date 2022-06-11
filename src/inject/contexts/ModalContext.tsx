import React, {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from "react";

import Modal from "../components/Modal";

interface ModalContextType {
  setModal: (newContent: ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  setModal: (content: ReactNode) => content,
  closeModal: () => null,
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const setModal = useCallback(
    (newContent: ReactNode) => {
      setContent(newContent);
      setActive(true);
    },
    [setContent, setActive]
  );

  const closeModal = useCallback(() => {
    setContent(null);
    setActive(false);
  }, [setActive]);

  const modalValues = useMemo(
    () => ({
      setModal,
      closeModal,
    }),
    [setModal, closeModal]
  );

  return (
    <ModalContext.Provider value={modalValues}>
      {children}
      <Modal active={active} content={content} closeModal={closeModal} />
    </ModalContext.Provider>
  );
}
const useModal = () => useContext(ModalContext) as ModalContextType;

export default useModal;
