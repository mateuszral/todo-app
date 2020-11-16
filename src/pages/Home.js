import React from 'react';
import styled, { css } from 'styled-components';
// import axios from 'axios';

import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

import { tasks } from 'assets/data/tasks';
import Button from 'components/atoms/Button/Button';

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  /* margin-top: 20px; */
  padding: 80px 40px 20px;
`;

const StyledWrapper = styled.div`
  min-height: 380px;
  box-shadow: 0 10px 30px -10px hsl(0, 0%, 0%, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 1fr 3fr;
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 17px 30px;
  background-color: ${({ theme, flex }) => (flex ? theme.secondary : theme.primary)};
  color: ${({ theme }) => theme.white};
  position: relative;

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `}
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.font.size.button};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

// const StyledAvatar = styled.img`
//   width: 86px;
//   height: 86px;
//   border: 5px solid ${({ theme }) => theme.twitters};
//   border-radius: 50px;
//   position: absolute;
//   right: 25px;
//   top: 25px;
//   z-index: 9999;
// `;

// const StyledLinkButton = styled.a`
//   display: block;
//   width: 47px;
//   height: 47px;
//   border-radius: 50px;
//   background: white url(${LinkIcon}) no-repeat;
//   background-size: 60%;
//   background-position: 50%;
//   position: absolute;
//   right: 25px;
//   top: 50%;
//   transform: translateY(-50%);
// `;

const Home = () => {
  // const [tasksList, setTasksList] = useState([]);

  // useEffect(() => {
  //   axios.get('/tasks.json').then(({ data: { tasks } }) => setTasksList(tasks));
  // }, []);

  return (
    <StyledGridWrapper>
      {tasks.map(({ title, content, date }) => (
        <StyledWrapper>
          <InnerWrapper>
            <StyledHeading>{title}</StyledHeading>
            <DateInfo>{date}</DateInfo>
          </InnerWrapper>
          <InnerWrapper flex>
            <Paragraph>{content}</Paragraph>
            <Button half>ZROBIONE</Button>
          </InnerWrapper>
        </StyledWrapper>
      ))}
    </StyledGridWrapper>
  );
};

export default Home;
