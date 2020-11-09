import styled from 'styled-components';

const Bar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background: ${({ theme }) => theme.white};
  width: 100%;
  height: 1px;

  &::before {
    content: '';
    position: absolute;
    background: ${({ theme }) => theme.primary};
    left: 0;
    width: 100%;
    height: 2px;
    transition: transform 0.3s ease-in-out;
    transform: scaleX(0);
  }
`;

export default Bar;
