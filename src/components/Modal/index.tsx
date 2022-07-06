import styled from '@emotion/styled';

const closeModalHandler = () => {
  document.querySelector('#modal').style.display = 'none';
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  zIndex: 10;
  transform: translate(-50%, -50%);
  display: none;
  width: 1100px;
  height: 100px;
  padding: 10px;
  background: #fff;
  border: 2px solid #000;

  @media (max-width: 320px){
    width: 300px;
  }

  @media (max-width: 600px){
    width: 500px;
  }

  @media (max-width: 1024px){
    width: 900px;
  }
`;

const Button = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
`;

export default function Modal() {
  return (
    <Wrapper id="modal">
      <p>
        자격요건 : ~~
      </p>
      <Button
        type="button"
        onClick={closeModalHandler}
      >
        X
      </Button>
    </Wrapper>
  );
}
