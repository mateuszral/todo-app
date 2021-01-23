import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { useUser } from 'store';

const StyledStatusMessage = styled.span`
  position: fixed;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  min-height: 50px;
  color: ${({ theme, success, error }) => (success ? theme.success : error && theme.error)};
  background-color: ${({ theme, success, error }) =>
    success ? theme.successBackground : error && theme.errorBackground};
  border: 1px solid
    ${({ theme, success, error }) => (success ? theme.success : error && theme.error)};
  z-index: ${({ theme }) => theme.zIndex.level2};
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: opacity 0.3s ease;
`;

const StatusMessage = ({ success, error, children }) => {
  const [, { closeInfoModal }] = useUser();
  return (
    <StyledStatusMessage success={success} error={error} onClick={closeInfoModal}>
      {children}
    </StyledStatusMessage>
  );
};

StatusMessage.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

StatusMessage.defaultProps = {
  success: false,
  error: false,
};

export default StatusMessage;
