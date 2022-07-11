import {
  Box, Button, TextField, Tooltip,
} from '@mui/material';
import { useState } from 'react';

import style from './style.module.css';

type Props = {
  socket: any;
  name: string;
  setName: (name: string) => void;
};

export default function MessageForm({ socket, name, setName }: Props) {
  const [message, setMessage] = useState<string>('');
  const [tmpMessage, setTmpMessage] = useState<string>('');
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (message === '') {
      return;
    }

    setTmpMessage(message);
    setOpenTooltip(true);

    setTimeout(() => {
      setTmpMessage('');
      setOpenTooltip(false);
    }, 5000);

    socket.emit('chat', { name, message });

    setMessage('');
  };

  return (
    <Box
      className={style.form}
      component="form"
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      <TextField
        required
        error={name === ''}
        type="text"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Tooltip
        open={openTooltip}
        title={tmpMessage}
        arrow
      >
        <TextField
          type="text"
          label="Chat"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Tooltip>
      <Button
        className={style.button}
        type="submit"
        variant="contained"
        size="large"
      >
        Submit
      </Button>
    </Box>
  );
}
