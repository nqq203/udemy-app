import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { callApiConfirmAccount } from '../../api/user';

const EmailActivation = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        console.log(token);
        const data = await callApiConfirmAccount(token);
        // Gửi yêu cầu tới backend để xác nhận email
        setSuccess(data.message);
      } catch (err) {
        setError('Error when confirm email account.');
      } finally {
        setLoading(false);
      }
    };

    confirmEmail();
  }, [token]);

  return (
    <div style={{margin: "0 auto", alignItems: "center", justifyContent: "center"}}>
      {loading && <p>Waiting to confirm</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default EmailActivation;
