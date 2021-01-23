import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import StatusMessage from 'components/atoms/StatusMessage/StatusMessage';
import Card from 'components/molecules/Card/Card';
import NewTaskBar from 'components/organisms/NewTaskBar/NewTaskBar';

import plusIcon from 'assets/icons/plus.svg';

import { routes } from 'routes';

import { useTasks, useUser } from 'store';

import { auth } from 'fire';

const StyledWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
  margin-bottom: 120px;

  ${({ theme }) => theme.mq.bigTablet} {
    margin-bottom: 0;
  }
`;

const StyledTaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 45px;

  ${({ theme }) => theme.mq.bigTablet} {
    min-height: calc(100vh - 45px);
  }
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: ${({ theme }) => theme.zIndex.level2};
  background-color: ${({ theme }) => theme.primary};
  background-size: 35%;
  border-radius: 50%;
  transform: rotate(${({ isVisible }) => (isVisible ? '225deg' : '0')});
  transition: transform 0.3s ease;
  margin-left: 15px;
`;

const Home = () => {
  const [isNewTaskBarVisible, setIsNewTaskBarVisible] = useState(false);
  const history = useHistory();

  const toggleNewTaskBar = () => {
    setIsNewTaskBarVisible((prevState) => !prevState);
  };

  const closeNewTaskBar = () => isNewTaskBarVisible && setIsNewTaskBarVisible(false);

  const [
    { tasks, firebaseErr, message },
    { fetchTasks, addTask, deleteTask, editTask },
  ] = useTasks();

  const [
    { userId, firebaseErr: userErr, message: userMessage },
    { refillData, checkVerificationEmail },
  ] = useUser();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push(routes.login);
      } else {
        refillData(user);
        if (checkVerificationEmail(user.emailVerified)) {
          fetchTasks(user.uid);
        }
      }
    });
  }, []);

  const error = firebaseErr || userErr;

  return (
    <StyledWrapper>
      {error ? <StatusMessage error={error}>{message || userMessage}</StatusMessage> : null}
      <StyledTaskWrapper onClick={closeNewTaskBar}>
        {tasks.length ? (
          tasks.map(({ taskId, title, content, date }) => (
            <Card
              key={taskId}
              taskId={taskId}
              title={title}
              content={content}
              date={date}
              handleDeleteTask={deleteTask}
              handleEditTask={editTask}
            />
          ))
        ) : (
          <Paragraph error>Nie masz żadnych zadań.</Paragraph>
        )}
      </StyledTaskWrapper>
      <NewTaskBar
        isVisible={isNewTaskBarVisible}
        handleClose={closeNewTaskBar}
        handleAddingTask={addTask}
        userId={userId}
      />
      <StyledButtonIcon
        icon={plusIcon}
        isVisible={isNewTaskBarVisible}
        onClick={toggleNewTaskBar}
      />
    </StyledWrapper>
  );
};

export default Home;
