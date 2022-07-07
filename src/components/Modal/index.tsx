import { useRef } from 'react';

import style from './modal.module.css';

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      id="modal"
      ref={ref}
      className={style.wrapper}
    >
      <div className={style.body}>
        <button
          className={`${style.closeButton} material-icons`}
          type="button"
          onClick={() => {
            ref.current!.style.display = 'none';
          }}
        >
          close
        </button>

        {children}
      </div>
    </div>
  );
}
