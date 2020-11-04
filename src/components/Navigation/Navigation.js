import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { routes } from 'routes';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledButton = styled.button`
  color: #000;
  text-decoration: none;
  margin: 0 10px;
`;

const Navigation = () => {
  return (
    <StyledNav>
      <li>
        <StyledButton as={NavLink} to={routes.home}>
          Home
        </StyledButton>
      </li>
      <li>
        <StyledButton as={NavLink} to={routes.login}>
          Zaloguj/Zarejestruj
        </StyledButton>
      </li>
    </StyledNav>
  );
};

export default Navigation;
