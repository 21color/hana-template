import { createContext } from 'react';
import ModalHeader from './Modal.Header';
import useModal from './useModal';

interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
}

export const modalContext = createContext<ModalContextProps>({
  openModal: () => {},
  closeModal: () => {},
});

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { ModalWrapper, openModal, closeModal } = useModal();

  return (
    <modalContext.Provider
      value={{
        openModal,
        closeModal,
      }}
    >
      <ModalWrapper>{children}</ModalWrapper>
    </modalContext.Provider>
  );
};

Modal.Header = ModalHeader;

export default Modal;
