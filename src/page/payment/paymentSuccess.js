import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Button } from "../../components/Button/Button";
import { PaymentSuccessDiv, PaymentThanksDiv } from "./paymentStyles";

export default function PaymentSuccess() {
  return (
    <PaymentSuccessDiv>
      <CheckCircleIcon style={{ fontSize: 150, color: 'var(--color-green-300)' }} />
      <Typography variant="h3" fontWeight={800} fontFamily={"serif"}>Payment successful!</Typography>
      <PaymentThanksDiv>
        <Typography variant="h5" textAlign='center'>Thank you for your purchase.</Typography>
        <Typography variant="h5" textAlign='center'>You can now access your course.</Typography>
      </PaymentThanksDiv>
      <Link to="/"><Button>Back to home</Button></Link>
    </PaymentSuccessDiv>
  );
}