import { useRef } from 'react';
import Markdown from 'react-markdown';

import style from './modal.module.css';

interface Props {
  children: string;
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
          className={`${style.xIcon} material-icons`}
          type="button"
          onClick={() => {
            ref.current!.style.display = 'none';
          }}
        >
          close
        </button>

        <Markdown className="markdown-body">
          {children}
        </Markdown>

        <button
          className={style.closeButton}
          type="button"
          onClick={() => {
            ref.current!.style.display = 'none';
          }}
        >
          close
        </button>
      </div>
    </div>
  );
}
