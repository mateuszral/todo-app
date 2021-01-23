import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';

import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Input from 'components/atoms/Input/Input';
import InputBar from 'components/atoms/InputBar/InputBar';
import Label from 'components/atoms/Label/Label';
import Button from 'components/atoms/Button/Button';

import { useUser } from 'store';

import { auth } from 'fire';

import { routes } from 'routes';
import StatusMessage from 'components/atoms/StatusMessage/StatusMessage';

const StyledWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
  margin: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFormWrapper = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${({ theme }) => theme.mq.bigTablet} {
    width: 50%;
  }
`;

const StyledInputWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.primary};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

const StyledDelBUtton = styled(Button)`
  background-color: ${({ theme }) => theme.errorBackground};
  color: ${({ theme }) => theme.error};
  margin-top: 25px;
  align-self: flex-end;

  &:hover {
    background-color: ${({ theme }) => theme.error};
  }
`;

const User = () => {
  const [
    { username, email, emailSent, firebaseErr, message },
    { refillData, changeUserData, deleteUser },
  ] = useUser();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push(routes.login);
      } else {
        refillData(user);
      }
    });
  }, []);

  return (
    <StyledWrapper>
      {emailSent || firebaseErr ? (
        <StatusMessage success={emailSent} error={firebaseErr}>
          {message}
        </StatusMessage>
      ) : null}
      <StyledFormWrapper>
        <StyledParagraph center>Ustawienia profilu</StyledParagraph>
        <Formik
          initialValues={{ username: '' }}
          onSubmit={(values, { resetForm }) => {
            changeUserData(values);
            resetForm();
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <StyledParagraph>Zmień nazwę użytkownika</StyledParagraph>
              <StyledInputWrapper>
                <Input
                  id='username'
                  type='text'
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='off'
                  required
                />
                <Label htmlFor='username'>{username}</Label>
                <InputBar />
              </StyledInputWrapper>
              <Button active type='submit'>
                Zmień nazwę
              </Button>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, { resetForm }) => {
            changeUserData(values);
            resetForm();
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <StyledParagraph>Zmień adres email</StyledParagraph>
              <StyledInputWrapper>
                <Input
                  id='email'
                  type='text'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='off'
                  required
                />
                <Label htmlFor='email'>{email}</Label>
                <InputBar />
              </StyledInputWrapper>
              <Button active type='submit'>
                Zmień email
              </Button>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{ password: '' }}
          onSubmit={(values, { resetForm }) => {
            changeUserData(values);
            resetForm();
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <StyledParagraph>Zmień swoje hasło</StyledParagraph>
              <StyledInputWrapper>
                <Input
                  id='password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='off'
                  required
                />
                <Label htmlFor='password'>Nowe hasło</Label>
                <InputBar />
              </StyledInputWrapper>
              <Button active type='submit'>
                Zmień hasło
              </Button>
            </Form>
          )}
        </Formik>
        <StyledDelBUtton half del onClick={deleteUser}>
          Usuń konto
        </StyledDelBUtton>
      </StyledFormWrapper>
    </StyledWrapper>
  );
};

export default User;
