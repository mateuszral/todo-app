import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.font.size.paragraph};
  font-weight: ${({ theme }) => theme.regular};
`;

export default Paragraph;
