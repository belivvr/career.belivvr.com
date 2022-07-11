import { useState } from 'react';
import { Box, Button, Modal } from '@mui/material';
import styled from '@emotion/styled';

const Key = styled.div(({ padding = '20px' }: { padding?: string }) => ({
  border: '1px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '60px',
  minHeight: '60px',
  padding,
  fontSize: '24px',
}));

const Description = styled.div({
  marginLeft: '40px',
  fontSize: '24px',
});

export default function HowToOperateModal(): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(true);

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          backgroundColor: '#fff',
          padding: '60px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '60px', height: '60px' }} />
              <Key style={{ borderBottom: 'none' }}>w</Key>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Key style={{ borderRight: 'none' }}>a</Key>
              <Key>s</Key>
              <Key style={{ borderLeft: 'none' }}>d</Key>
            </div>
          </div>
          <Description>이동</Description>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Key padding="20px 40px">Shift</Key>
          <Description>빠른 이동</Description>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Key padding="20px 100px">Space Bar</Key>
          <Description>점프</Description>
        </div>

        <Button
          variant="contained"
          onClick={() => setOpenModal(false)}
        >
          닫기
        </Button>

        <p style={{ marginTop: '20px' }}>(우리 디자이너 선생님도 뽑아요 ㅠㅠ)</p>
      </Box>
    </Modal>
  );
}
