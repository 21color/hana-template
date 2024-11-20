import styled from '@emotion/styled';
import { useEffect } from 'react';
import ModalPortal from './ModalPortal';

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper = ({ children, onClose }: ModalWrapperProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <ModalPortal>
      <ModalBackDrop
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <div className="modal-content">{children}</div>
      </ModalBackDrop>
    </ModalPortal>
  );
};

export default ModalWrapper;

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
