import { Button } from '@mui/material';
import { useRef } from 'react';
import Markdown from 'react-markdown';
import { Socket } from 'socket.io-client';

import style from './modal.module.css';

interface Props {
  socket: Socket;
  children: string;
}

export default function Modal({ socket, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    ref.current!.style.display = 'none';
    socket.emit('logging', { behavior: 'unity-modal-close' });
  };

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
          onClick={handleClose}
        >
          close
        </button>

        <Markdown className="markdown-body">
          {children}
        </Markdown>

        <Button
          className={style.closeButton}
          type="button"
          variant="contained"
          color="error"
          size="large"
          onClick={handleClose}
        >
          close
        </Button>
      </div>
    </div>
  );
}
