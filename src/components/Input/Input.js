import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border: none;
  background: none;
  padding: 10px;
  position: relative;
  color: ${({ theme }) => theme.white};
  z-index: ${({ theme }) => theme.zIndex.level1};

  &:focus,
  &:valid {
    outline: none;

    + label {
      transform: translate(-12%, -50%) scale(0.75);
      color: ${({ theme }) => theme.white};
    }

    ~ div {
      &::before,
      &::after {
        transform: scaleX(1);
      }
    }
  }
`;

export default Input;
