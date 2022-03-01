import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import styled from 'styled-components';

const ErrorText = styled.div`
  color: red;
`;

function ErrorMessage({ error }: InferProps<typeof ErrorMessage.propTypes>) {
  let text = null;
  switch (error) {
    case 'empty':
      text = <ErrorText> Please fill out all fields! </ErrorText>;
      break;
    case 'fail':
      text = <ErrorText> Invalid username or password. </ErrorText>;
      break;
    case 'badEmail':
      text = <ErrorText> Invalid email address </ErrorText>;
      break;
    case 'badPassword':
      text = (
        <ErrorText>
          Invalid password. Passwords must have at least 6 characters, at most
          61 characters, and can only contain alphanumeric character or the
          following special characters:&lsquo;!?$%^*)(+=._-&rsquo;
        </ErrorText>
      );
      break;
    case 'mismatch':
      text = <ErrorText> Passwords do not match </ErrorText>;
      break;
    case 'duplicate':
      text = (
        <ErrorText>
          Email already exists! Try resetting your password or a different email
          address
        </ErrorText>
      );
      break;
    default:
      text = null;
  }
  return text;
}

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

export default ErrorMessage;
