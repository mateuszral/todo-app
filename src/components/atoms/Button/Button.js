import styled from 'styled-components';

const Button = styled.button`
  background-color: ${({ theme, active, del }) =>
    active ? theme.primary : del ? theme.errorBackground : theme.tertiary};
  color: ${({ theme, active, del }) => (active ? theme.white : del ? theme.error : theme.grey200)};
  width: ${({ half }) => (half ? '50%' : '100%')};
  border: none;
  padding: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  outline: none;
  margin-top: ${({ del }) => (del ? '15px' : '0')};

  &:hover {
    background-color: ${({ theme, del }) => (del ? theme.error : theme.primary)};
    color: ${({ theme }) => theme.white};
  }
`;

export default Button;
