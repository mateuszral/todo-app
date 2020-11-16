import React, { useState } from 'react';
import styled from 'styled-components';

import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import LoginForm from 'components/molecules/LoginForm/LoginForm';

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledFormWrapper = styled.div`
  background: hsla(206, 42%, 13%, 0.9);
  padding: 40px;
  box-shadow: 0 5px 10px 5px hsla(206, 42%, 13%, 0.3);
  color: #fff;
  width: 500px;
  height: 600px;
  border-radius: 6px;
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
        <Button half id='login' onClick={handleTabToggle} active={isLoginActive}>
          Zaloguj się
        </Button>
        <Button half id='signup' onClick={handleTabToggle} active={isSignupActive}>
          Zarejestruj się
        </Button>
        <StyledSectionsWrapper>
          <StyledSection active={isSignupActive}>
            <StyledHeading>Zarejestruj się za darmo</StyledHeading>
            <LoginForm type='signup' />
          </StyledSection>
          <StyledSection active={isLoginActive}>
            <StyledHeading>Witaj z powrotem!</StyledHeading>
            <LoginForm type='login' />
          </StyledSection>
        </StyledSectionsWrapper>
      </StyledFormWrapper>
    </StyledWrapper>
  );
};

export default Login;
