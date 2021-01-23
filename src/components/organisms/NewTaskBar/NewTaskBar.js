import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import InputBar from 'components/atoms/InputBar/InputBar';
import Label from 'components/atoms/Label/Label';
import Heading from 'components/atoms/Heading/Heading';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.secondary};
  z-index: ${({ theme }) => theme.zIndex.level1};
  border-left: 10px solid ${({ theme }) => theme.primary};
  padding: 60px 90px;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.3s ease;

  ${({ theme }) => theme.mq.bigTablet} {
    width: 680px;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
  width: 100%;

  :last-of-type {
    label {
      height: 30px;
    }
  }
`;

const StyledTextArea = styled(Input)`
  padding-bottom: 100px;
  height: 30vh;
  resize: none;
`;

const NewTaskBar = ({ isVisible, userId, handleClose, handleAddingTask }) => (
  <StyledWrapper isVisible={isVisible}>
    <Heading white>Dodaj nowe zadanie</Heading>
    <Formik
      initialValues={{ title: '', content: '' }}
      onSubmit={(values, { resetForm }) => {
        values.taskId = uuidv4();
        values.authorId = userId;
        values.date = new Date().getTime();
        handleAddingTask(values);
        resetForm();
        handleClose();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <StyledForm>
          <StyledInputWrapper>
            <Input
              type='text'
              name='title'
              id='title'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              required
            />
            <Label htmlFor='title'>Tytuł</Label>
            <InputBar />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <StyledTextArea
              name='content'
              as='textarea'
              id='content'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              required
            />
            <Label htmlFor='content'>Opis</Label>
            <InputBar />
          </StyledInputWrapper>
          <Button type='submit'>Dodaj zadanie</Button>
        </StyledForm>
      )}
    </Formik>
  </StyledWrapper>
);

NewTaskBar.propTypes = {
  isVisible: PropTypes.bool,
  userId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddingTask: PropTypes.func.isRequired,
};

NewTaskBar.defaultProps = {
  isVisible: false,
};

export default NewTaskBar;
