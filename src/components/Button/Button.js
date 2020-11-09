import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme, active }) => (active ? theme.primary : theme.tertiary)};
  color: ${({ theme, active }) => (active ? theme.white : theme.grey200)};
  width: ${({ half }) => (half ? '50%' : '100%')};
  border: none;
  padding: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
`;

export default Button;
