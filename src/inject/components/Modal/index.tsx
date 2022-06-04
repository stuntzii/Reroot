import ReactDOM from "react-dom";

interface Props {
  children?: React.ReactNode;
  el: HTMLElement;
}

export default function Modal({ children, el }: Props) {
  return ReactDOM.createPortal(children, el);
}
