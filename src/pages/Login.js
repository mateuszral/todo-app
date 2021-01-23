import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import StatusMessage from 'components/atoms/StatusMessage/StatusMessage';
import LoginForm from 'components/molecules/LoginForm/LoginForm';

import { routes } from 'routes';

import { useUser } from 'store';

import { auth } from 'fire';

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
`;

const StyledFormWrapper = styled.div`
  background: ${({ theme }) => theme.secondary};
  padding: 40px;
  box-shadow: 0 5px 10px 5px hsla(206, 42%, 13%, 0.3);
  color: ${({ theme }) => theme.white};
  width: 100%;
  height: 600px;
  border-radius: 6px;

  ${({ theme }) => theme.mq.bigTablet} {
    width: 40%;
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

const StyledHeading = styled(Heading)`
  text-align: center;
  margin: 40px 0;
`;

const Login = () => {
  const [isSignupActive, setIsSignupActive] = useState(false);
  const history = useHistory();

  const [
    { userDel, emailSent, loggedOut, passDiff, firebaseErr, message },
    { registerUser, loginUser },
  ] = useUser();

  const handleTabToggle = (e) => {
    if (e.target.id === 'login') {
      setIsSignupActive(false);
    } else {
      setIsSignupActive(true);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => user && history.push(routes.home));
  }, []);

  const success = userDel || emailSent || loggedOut;
  const error = passDiff || firebaseErr;

  return (
    <StyledWrapper>
      {success || error ? (
        <StatusMessage success={success} error={error}>
          {message}
        </StatusMessage>
      ) : null}
      <StyledFormWrapper>
        <Button half id='login' onClick={handleTabToggle} active={!isSignupActive}>
          Zaloguj
        </Button>
        <Button half id='signup' onClick={handleTabToggle} active={isSignupActive}>
          Zarejestruj
        </Button>
        <StyledSectionsWrapper>
          <StyledSection active={isSignupActive}>
            <StyledHeading white>Zarejestruj się za darmo</StyledHeading>
            <LoginForm type='signup' handleSignup={registerUser} />
          </StyledSection>
          <StyledSection active={!isSignupActive}>
            <StyledHeading white>Witaj z powrotem!</StyledHeading>
            <LoginForm type='login' handleLogin={loginUser} />
          </StyledSection>
        </StyledSectionsWrapper>
      </StyledFormWrapper>
    </StyledWrapper>
  );
};

export default Login;
