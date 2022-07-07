import styled from '@emotion/styled';

const closeModalHandler = () => {
  document.querySelector('#modal').style.display = 'none';
};

const Wrapper = styled.div`
  position: absolute;
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
  width: 1100px;
  height: 100px;
  padding: 10px;
  border: 2px solid #000;
  background: #fff;

  @media (min-width: 320px){
    width: 300px;
  }

  @media (min-width: 600px){
    width: 500px;
  }

  @media (min-width: 1024px){
    width: 900px;
  }
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
