import styled from 'styled-components';

export const ActivationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; // Full viewport height
  background-color: #f4f4f9;
`;

export const Message = styled.p`
  color: ${props => props.type === 'error' ? '#d32f2f' : '#4caf50'};
  font-size: 18px;
  font-weight: bold;
`;

export const Loader = styled.div`
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
