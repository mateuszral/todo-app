import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Formik, Form } from 'formik';

import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import InputBar from 'components/atoms/InputBar/InputBar';
import Label from 'components/atoms/Label/Label';

import { convertMsToDate } from 'helpers';

const StyledCard = styled.div`
  padding: 15px;
  margin: 12px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${({ theme }) => theme.secondary};
  transition: transform 0.3s ease;

  ${({ theme }) => theme.mq.bigTablet} {
    width: 60%;
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
  height: 15vh;
  resize: none;
`;

const StyledDate = styled(Paragraph)`
  position: absolute;
  top: -7px;
  right: 10px;
  color: ${({ theme }) => theme.grey200};
  font-size: 12px;

  ${({ theme }) => theme.mq.bigTablet} {
    font-size: 17px;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled(Button)`
  align-self: flex-end;
  border-radius: 5px;
  padding: 5px;
  width: initial;
  margin: 0 5px;

  ${(props) =>
    props.delete &&
    css`
      &:hover {
        background-color: crimson;
      }
    `}
`;

const Card = ({ taskId, title, content, date, handleDeleteTask, handleEditTask }) => {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [isTaskEdited, setIsTaskEdited] = useState(false);

  const completeTask = (e) => {
    e.target.parentElement.parentElement.style.order = 1;
    e.target.parentElement.parentElement.style.transform = 'scale(0.95)';
    e.target.parentElement.parentElement.style.filter = 'grayscale(75%)';

    setIsTaskCompleted((prevState) => !prevState);
  };

  const deleteTask = (e, id) => {
    e.target.parentElement.style.transform = 'scale(0)';
    setTimeout(() => {
      handleDeleteTask(id);
    }, 300);
  };

  return (
    <StyledCard>
      {isTaskEdited ? (
        <Formik
          initialValues={{ title: '', content: '' }}
          onSubmit={(values) => {
            values.taskId = taskId;
            handleEditTask(values);
            setIsTaskEdited(false);
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
              <StyledButton type='submit'> Gotowe</StyledButton>
            </StyledForm>
          )}
        </Formik>
      ) : (
        <>
          <Heading white>{title}</Heading>
          <Paragraph>{content}</Paragraph>
        </>
      )}
      <StyledDate>{convertMsToDate(date)}</StyledDate>
      {isTaskCompleted ? (
        <StyledButton delete onClick={(e) => deleteTask(e, taskId)}>
          Usuń
        </StyledButton>
      ) : isTaskEdited ? null : (
        <StyledButtonWrapper>
          <StyledButton onClick={() => setIsTaskEdited(true)}>Edytuj</StyledButton>
          <StyledButton onClick={completeTask}>Zrobione</StyledButton>
        </StyledButtonWrapper>
      )}
    </StyledCard>
  );
};

Card.propTypes = {
  taskId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
};

export default Card;
