import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApiConfirmAccount } from '../../api/user';
import { ActivationContainer, Message, Loader } from './EmailActivationStyle'; // Import your styled components

const EmailActivation = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const data = await callApiConfirmAccount(token);
        setSuccess(data.message);
      } catch (err) {
        setError('Error when confirming email account. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <ActivationContainer>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Message type="success">{success}</Message>
      )}
    </ActivationContainer>
  );
};

export default EmailActivation;
