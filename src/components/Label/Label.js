import styled from 'styled-components';

const Label = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.grey200};
  transition: transform 0.25s ease-in-out;
  display: flex;
  align-items: center;
`;

export default Label;
