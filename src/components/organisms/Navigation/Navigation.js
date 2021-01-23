import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { routes } from 'routes';

import { useUser, useTasks } from 'store';

import { auth } from 'fire';

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
  border-top: 6px solid ${({ theme }) => theme.primary};
  z-index: ${({ theme }) => theme.zIndex.level1};
  background-color: ${({ theme }) => theme.white};
`;

const StyledButton = styled.button`
  color: ${({ theme }) => theme.black};
  text-decoration: none;
  margin: 0 10px;
  background: none;
  border: 0;
  outline: none;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  &:focus {
    outline: none;
  }
`;

const Navigation = () => {
  const [{ username, loggedIn }, { logoutUser, refillData, resetUser }] = useUser();
  const [, { resetTasks }] = useTasks();

  const logout = () => {
    resetTasks();
    resetUser();
    logoutUser();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        refillData(user);
      }
    });
  }, []);

  return (
    <StyledNav>
      {loggedIn ? <span>Witaj, {username}</span> : null}
      <li>
        <StyledButton as={NavLink} to={routes.home} disabled={!loggedIn}>
          Home
        </StyledButton>
      </li>
      {loggedIn ? (
        <>
          <li>
            <StyledButton as={NavLink} to={routes.user}>
              Profil
            </StyledButton>
          </li>
          <li>
            <StyledButton onClick={logout}>Wyloguj</StyledButton>
          </li>
        </>
      ) : (
        <li>
          <StyledButton as={NavLink} to={routes.login}>
            Zaloguj/Zarejestruj
          </StyledButton>
        </li>
      )}
    </StyledNav>
  );
};

export default Navigation;
