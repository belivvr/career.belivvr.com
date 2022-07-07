import styled from '@emotion/styled';

const closeModalHandler = () => {
  document.querySelector('#modal').style.display = 'none';
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  zIndex: 10;
  display: none;
  background: rgba(0,0,0,.8);
`;

const Inner = styled.div`
  position: absolute;  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  maxWidht: 1200px;
  padding: 10px;
  border: 2px solid #000;
  background: #fff;
`;

const Button = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
`;

export default function Modal() {
  return (
    <Wrapper id="modal">
      <Inner>
        <p>
          자격요건 : ~~
        </p>
        <Button
          type="button"
          onClick={closeModalHandler}
        >
          X
        </Button>
      </Inner>
    </Wrapper>
  );
}
