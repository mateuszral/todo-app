import styled from 'styled-components';

const ButtonIcon = styled.button`
  display: block;
  height: 67px;
  width: 67px;
  border-radius: 20px;
  background-color: ${({ active, theme }) => (active ? theme.white : 'transparent')};
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  &.active {
    background-color: white;
  }
`;

export default ButtonIcon;
