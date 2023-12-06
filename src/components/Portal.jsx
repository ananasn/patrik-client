import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const element = document.querySelector('body');
  if (element) return createPortal(children, element);
}

export default Portal;