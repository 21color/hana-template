import { useContext } from 'react';
import { modalContext } from './Modal';

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  const { closeModal } = useContext(modalContext);

  if (!closeModal) {
    throw new Error('ModalHeader must be used within a Modal component');
  }

  return (
    <div className="modal-header">
      <button onClick={closeModal}>Close</button>
      {children}
    </div>
  );
};

export default ModalHeader;
