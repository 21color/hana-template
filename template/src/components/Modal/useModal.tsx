import { useState } from 'react';
import ModalWrapper from './ModalWrapper';

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return {
    ModalWrapper: ({ children }: { children: React.ReactNode }) => {
      return isOpenModal ? (
        <ModalWrapper onClose={closeModal}>{children}</ModalWrapper>
      ) : null;
    },
    openModal,
    closeModal,
  };
};

export default useModal;
