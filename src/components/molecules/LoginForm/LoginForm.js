import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Input from 'components/atoms/Input/Input';
import Label from 'components/atoms/Label/Label';
import InputBar from 'components/atoms/InputBar/InputBar';
import Button from 'components/atoms/Button/Button';

import { useUser } from 'store';

const StyledInputWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
`;

const StyledButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 10px 0px;
  grid-template-areas:
    'login login'
    '. reset';
`;

const StyledButton = styled(Button)`
  :first-of-type {
    grid-area: login;
  }
  :last-of-type {
    grid-area: reset;
  }
`;

const LoginForm = ({ type, handleSignup, handleLogin }) => {
  const [, { resetPassword }] = useUser();
  return type === 'login' ? (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        handleLogin(values);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <StyledInputWrapper>
            <Input
              id='loginEmail'
              type='text'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete='off'
            />
            <Label htmlFor='loginEmail'>Email</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input
              id='loginPassword'
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <Label htmlFor='loginPassword'>Hasło</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledButtonWrapper>
            <StyledButton active type='submit'>
              Zaloguj
            </StyledButton>
            <StyledButton type='button' onClick={() => resetPassword(values.email)}>
              Resetuj hasło
            </StyledButton>
          </StyledButtonWrapper>
        </Form>
      )}
    </Formik>
  ) : (
    <Formik
      initialValues={{ email: '', username: '', password: '', repeatPassword: '' }}
      onSubmit={(values) => {
        values.userId = uuidv4();
        handleSignup(values);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <StyledInputWrapper>
            <Input
              id='username'
              type='text'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete='off'
            />
            <Label htmlFor='username'>Nickname</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input
              id='email'
              type='text'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              autoComplete='off'
            />
            <Label htmlFor='email'>Email</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input
              id='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <Label htmlFor='password'>Hasło</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input
              id='repeatPassword'
              type='password'
              value={values.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <Label htmlFor='repeatPassword'>Powtórz hasło</Label>
            <InputBar />
          </StyledInputWrapper>
          <Button active type='submit'>
            Zarejestruj
          </Button>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  type: PropTypes.string.isRequired,
  handleSignup: PropTypes.func,
  handleLogin: PropTypes.func,
};

LoginForm.defaultProps = {
  handleSignup: null,
  handleLogin: null,
};

export default LoginForm;
