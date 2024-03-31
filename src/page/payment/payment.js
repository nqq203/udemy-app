import React from "react";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import PaymentIcon from '@mui/icons-material/Payment';
import WalletIcon from '@mui/icons-material/Wallet';

import { Button } from "../../components/Button/Button";
import { 
    PaymentContainer, 
    PaymentSummaryContainer, 
    PaymentInfoContainer, 
    PaymentInfoItem
} from "./paymentStyles";

import { countries } from "../data/country";
import { courses } from "../data/courses";

export default function Payment() {
    const [choice, setChoice] = React.useState('');
    const [expanded, setExpanded] = React.useState('');
    const totalPrice = courses.reduce((acc, course) => acc + course.price, 0);
    
    const handleSelectCountryChange = (event) => {
        setChoice(event.target.value);
    };
    
    const handlePaymentMethodChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const form = event.target;
        const data = {
            country: form.country.value,
            paymentMethod: form.paymentMethod.value,
            cardName: form.firstname.value,
            cardNumber: form.cardnumber.value,  
            cardMonth: form.month.value,
            cardYear: form.year.value,
            cardCVC: form.cvv.value,
            totalPrice: totalPrice
        };

        if (data.country === '') {
            alert('Please select a country');
            return;
        }

        if(data.paymentMethod === '') {
            alert('Please select a payment method');
            return;
        }
        else if(data.paymentMethod === 'card') {
            if(data.cardName === '' 
            || data.cardNumber === '' 
            || data.cardMonth === '' 
            || data.cardYear === '' 
            || data.cardCVC === '') {
                alert('Please fill out all required fields');
                return;
            }
        }
        else if (data.paymentMethod === 'paypal') {
            data.cardName = '';
            data.cardNumber = '';
            data.cardMonth = '';
            data.cardYear = '';
            data.cardCVC = '';
        }

        console.log(data);
    };


    return (
        <PaymentContainer>
            <Typography variant="h4" fontWeight={800} fontFamily={"serif"}>Checkout</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7} px={10}>
                        <PaymentInfoItem>
                            <h2>Billing address</h2>
                            <FormControl>
                                <InputLabel id="country-choice">Country</InputLabel>
                                <Select
                                    labelId="country-choice"
                                    value={choice}
                                    label="Country"
                                    name="country"
                                    onChange={handleSelectCountryChange}
                                >
                                    {Object.keys(countries).map((country) => (
                                        <MenuItem key={country} value={country}>{countries[country]}</MenuItem>
                                    ))}
                                </Select>
                                <span className="payment-note">The platform is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</span>
                            </FormControl>
                        </PaymentInfoItem>

                        <PaymentInfoItem>
                            <h2>Payment method</h2>
                            <FormControl>
                                <RadioGroup
                                    name="paymentMethod"
                                >
                                    <Accordion expanded={expanded === 'panel1'} onChange={handlePaymentMethodChange('panel1')}>
                                        <AccordionSummary sx={{margin: 0}}>
                                            <FormControlLabel 
                                                value="card" 
                                                control={<Radio />} 
                                                label={
                                                    <Stack flexDirection="row" gap={1}>
                                                        <PaymentIcon></PaymentIcon>
                                                        <Typography fontWeight={700}>Credit/Debit Card</Typography>
                                                    </Stack>
                                                } />
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <PaymentInfoContainer>
                                                <h4>Name on card</h4>
                                                <TextField name="firstname" variant="outlined" placeholder="Name on card" fullWidth/>

                                                <h4>Card number</h4>
                                                <TextField name="cardnumber" variant="outlined" placeholder="1234 5678 9012 3456" fullWidth/>

                                                <h4>Expired date</h4>
                                                <Stack spacing={2} direction="row">
                                                    <TextField name="month" variant="outlined" placeholder="MM"/>
                                                    <TextField name="year" variant="outlined" placeholder="YY"/>
                                                </Stack>

                                                <h4>CVC/CVV</h4>
                                                <TextField name="cvv" variant="outlined" placeholder="CVC" fullWidth/>
                                            </PaymentInfoContainer>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panel2'} onChange={handlePaymentMethodChange('panel2')}>
                                        <AccordionSummary sx={{margin: 0}}>
                                            <FormControlLabel 
                                            value="paypal" 
                                            control={<Radio />} 
                                            label={
                                                <Stack flexDirection="row" gap={1}>
                                                    <WalletIcon></WalletIcon>
                                                    <Typography fontWeight={700}>PayPal</Typography>
                                                </Stack>
                                            } />
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <p style={{margin: 0}}>
                                                In order to complete your transaction, we will transfer you over to PayPal's secure servers.
                                            </p>
                                            <h4>
                                                The amount you will be charged by Paypal is ${totalPrice}.
                                            </h4>
                                        </AccordionDetails>
                                    </Accordion>
                                </RadioGroup>
                            </FormControl>
                        </PaymentInfoItem>

                        <PaymentInfoItem>
                            <h2>Order details</h2>
                            {courses.map((course, index) => (
                                <PaymentSummaryContainer key={index}>
                                    <Stack flexDirection='row'>
                                        <img src="/images/reactnative.png" alt="test"></img>
                                        <h4>{course.name}</h4>
                                    </Stack>
                                    <p>${course.price}</p>
                                </PaymentSummaryContainer>
                            ))}
                        </PaymentInfoItem>
                    </Grid>

                    <Grid item xs={12} md={5} px={10} sx={{backgroundColor: 'var(--color-gray-100)'}}>
                        <Stack spacing={1}>
                            <h2>Summary</h2>

                            <Stack flexDirection='row' justifyContent='space-between'>
                                <span>Original Price:</span>
                                <span>${totalPrice}</span>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <span>Discounts:</span>
                                <span>-$0</span>
                            </Stack>
                            <Divider />
                            <Stack flexDirection='row' justifyContent='space-between' pb={2}>
                                <span><b>Total:</b></span>
                                <span><b>${totalPrice}</b></span>
                            </Stack>

                            <Button 
                                width='100%' 
                                bgColor="var(--color-purple-300)" 
                                hoverBgColor="var(--color-purple-400)" 
                                fontWeight="700"
                                type="submit"
                            >
                                Complete Checkout
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </PaymentContainer>
    );
}