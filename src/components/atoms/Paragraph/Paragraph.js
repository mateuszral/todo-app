import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.font.size.paragraph};
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme, error }) => (error ? theme.error : theme.grey300)};
  white-space: pre-wrap;
`;

export default Paragraph;
