import { Button, styled } from '@mui/material';

import { isMobileDevice } from '../utils/device';

const StyledButton = styled(Button)({
  position: 'fixed',
  zIndex: 10,
  left: '48px',
  bottom: '150px',
  display: isMobileDevice ? 'block' : 'none',
  width: '60px',
  height: '60px',
  padding: '0',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  color: 'rgba(255, 255, 255, 0.7)',
  borderRadius: '100%',

  '&:focus': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default function JumpButton(): JSX.Element | null {
  return (
    <StyledButton
      size="large"
      variant="contained"
      color="inherit"
      id="jump"
    >
      Jump
    </StyledButton>
  );
}
