import { ReactPortal, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

export default function ModalPortal({
  children,
}: ModalPortalProps): ReactPortal | null {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let modalRoot = document.getElementById('modal-root');

    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }

    setElement(modalRoot);

    return () => {
      if (modalRoot) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  return element ? ReactDOM.createPortal(children, element) : null;
}
