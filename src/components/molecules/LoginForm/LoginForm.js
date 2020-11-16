import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Input from 'components/atoms/Input/Input';
import Label from 'components/atoms/Label/Label';
import InputBar from 'components/atoms/InputBar/InputBar';
import Button from 'components/atoms/Button/Button';

const StyledInputWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;
`;

const LoginForm = ({ type }) => {
  return (
    <form>
      {type === 'login' ? (
        <>
          <StyledInputWrapper>
            <Input id='loginEmail' type='text' required />
            <Label htmlFor='loginEmail'>Email</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input id='loginPassword' type='password' required />
            <Label htmlFor='loginPassword'>Hasło</Label>
            <InputBar />
          </StyledInputWrapper>
          <Button active type='submit'>
            Zaloguj
          </Button>
        </>
      ) : (
        <>
          <StyledInputWrapper>
            <Input id='nick' type='text' required />
            <Label htmlFor='nick'>Nickname</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input id='email' type='text' required />
            <Label htmlFor='email'>Email</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input id='password' type='password' required />
            <Label htmlFor='password'>Hasło</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <Input id='repeatPassword' type='password' required />
            <Label htmlFor='repeatPassword'>Powtórz hasło</Label>
            <InputBar />
          </StyledInputWrapper>
          <Button active type='submit'>
            Zarejestruj
          </Button>
        </>
      )}
    </form>
  );
};

LoginForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default LoginForm;
