import React, { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledFormWrapper = styled.div`
  background: rgba(19, 35, 47, 0.9);
  padding: 40px;
  box-shadow: 0 5px 10px 5px rgba(19, 35, 47, 0.3);
  color: #fff;
  width: 500px;
  height: 600px;
  border-radius: 6px;
`;

const StyledButton = styled.button`
  background-color: ${({ active }) => (active ? '#1ab188' : 'rgba(160, 179, 176, 0.25)')};
  color: ${({ active }) => (active ? '#fff' : '#a0b3b0')};
  width: ${({ half }) => (half ? '50%' : '100%')};
  border: none;
  padding: 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
  outline: none;

  &:hover {
    background-color: #1ab188;
    color: #fff;
  }
`;

const StyledSectionsWrapper = styled.div`
  position: relative;
`;

const StyledSection = styled.section`
  position: absolute;
  width: 100%;
  transform: ${({ active }) => (active ? 'scale(1)' : 'scale(0)')};
  transition: transform 0.3s ease;
`;

const StyledHeading = styled.h2`
  text-align: center;
  margin: 40px 0;
  font-size: 2em;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
`;

const StyledLabel = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: rgba(160, 179, 176, 0.4);
  transition: transform 0.25s ease;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  padding: 10px;
  position: relative;
  color: #fff;
  z-index: 10;

  &:focus,
  &:valid {
    outline: none;

    + label {
      transform: translate(-12%, -50%) scale(0.75);
      color: #fff;
    }

    ~ div {
      &::before,
      &::after {
        transform: scaleX(1);
      }
    }
  }
`;

const StyledBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  background: #fff;
  width: 100%;
  height: 1px;

  &::before {
    content: '';
    position: absolute;
    background: #1ab188;
    left: 0;
    width: 100%;
    height: 2px;
    transition: transform 0.3s ease-in-out;
    transform: scaleX(0);
  }
`;

const Login = () => {
  const [isSignupActive, setIsSignupActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleTabToggle = (e) => {
    if (e.target.id === 'login') {
      setIsSignupActive(false);
      setIsLoginActive(true);
    } else {
      setIsSignupActive(true);
      setIsLoginActive(false);
    }
  };

  return (
    <StyledWrapper>
      <StyledFormWrapper>
        <StyledButton
          half
          id='login'
          onClick={handleTabToggle}
          active={isLoginActive}
          type='button'
        >
          Zaloguj się
        </StyledButton>
        <StyledButton
          half
          id='signup'
          onClick={handleTabToggle}
          active={isSignupActive}
          type='button'
        >
          Zarejestruj się
        </StyledButton>
        <StyledSectionsWrapper>
          <StyledSection active={isSignupActive}>
            <StyledHeading>Zarejestruj się za darmo</StyledHeading>
            <form>
              <StyledInputWrapper>
                <StyledInput id='nick' type='text' required />
                <StyledLabel htmlFor='nick'>Nickname</StyledLabel>
                <StyledBar />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <StyledInput id='email' type='text' required />
                <StyledLabel htmlFor='email'>Email</StyledLabel>
                <StyledBar />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <StyledInput id='password' type='password' required />
                <StyledLabel htmlFor='password'>Hasło</StyledLabel>
                <StyledBar />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <StyledInput id='repeatPassword' type='password' required />
                <StyledLabel htmlFor='repeatPassword'>Powtórz hasło</StyledLabel>
                <StyledBar />
              </StyledInputWrapper>
              <StyledButton active type='submit'>
                Zarejestruj
              </StyledButton>
            </form>
          </StyledSection>
          <StyledSection active={isLoginActive}>
            <StyledHeading>Witaj z powrotem!</StyledHeading>
            <form>
              <StyledInputWrapper>
                <StyledInput id='loginEmail' type='text' required />
                <StyledLabel htmlFor='loginEmail'>Email</StyledLabel>
                <StyledBar />
              </StyledInputWrapper>
              <StyledInputWrapper>
                <StyledInput id='loginPassword' type='password' required />
                <StyledLabel htmlFor='loginPassword'>Hasło</StyledLabel>
                <StyledBar />
              </StyledInputWrapper>
              <StyledButton active type='submit'>
                Zaloguj
              </StyledButton>
            </form>
          </StyledSection>
        </StyledSectionsWrapper>
      </StyledFormWrapper>
    </StyledWrapper>
  );
};

export default Login;
