import styled from 'styled-components';

const Heading = styled.h1`
  font-size: ${({ theme, big }) => (big ? theme.font.size.header : theme.font.size.smallHeader)};
  font-weight: ${({ theme }) => theme.bold};
`;

export default Heading;
