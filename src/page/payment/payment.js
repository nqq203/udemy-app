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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import { PaymentContainer, PaymentSummaryContainer, PaymentInfoContainer } from "./paymentStyles";
import { Button } from "../../components/Button/Button";
import { countries } from "../data/country";
import { courses } from "../data/courses";

export default function Payment() {
    const [choice, setChoice] = React.useState('');
    const [expanded, setExpanded] = React.useState('');
    
    const handleSelectCountryChange = (event) => {
        setChoice(event.target.value);
    };
    
    const handlePaymentMethodChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Payment successful');
    };

    const total = courses.reduce((acc, course) => acc + course.price, 0);

    return (
        <PaymentContainer>
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7} px={10}>
                        <div>
                            <h2>Billing address</h2>
                            <FormControl>
                                <InputLabel id="country-choice">Country</InputLabel>
                                <Select
                                    labelId="country-choice"
                                    value={choice}
                                    label="Country"
                                    onChange={handleSelectCountryChange}
                                    required
                                >
                                    {Object.keys(countries).map((country) => (
                                        <MenuItem key={country} value={country}>{countries[country]}</MenuItem>
                                    ))}
                                </Select>
                                <span className="payment-note">Udemy is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.</span>
                            </FormControl>
                        </div>

                        <div>
                            <h2>Payment method</h2>
                            <FormControl>
                                <RadioGroup
                                    defaultValue="cash"
                                    name="payment-method-choice"
                                >
                                    <Accordion expanded={expanded === 'panel1'} onChange={handlePaymentMethodChange('panel1')}>
                                        <AccordionSummary sx={{margin: 0}}>
                                            <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <PaymentInfoContainer>
                                                <h4>Name on card</h4>
                                                <TextField name="firstname" variant="outlined" fullWidth required/>
                                            </PaymentInfoContainer>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion expanded={expanded === 'panel2'} onChange={handlePaymentMethodChange('panel2')}>
                                        <AccordionSummary sx={{margin: 0}}>
                                            <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p style={{margin: 0}}>
                                                In order to complete your transaction, we will transfer you over to PayPal's secure servers.
                                            </p>
                                            <h4>
                                                The amount you will be charged by Paypal is ${total}.
                                            </h4>
                                        </AccordionDetails>
                                    </Accordion>
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div>
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
                        </div>
                    </Grid>

                    <Grid item xs={12} md={5} px={10} sx={{backgroundColor: 'var(--color-gray-100)'}}>
                        <Stack spacing={1}>
                            <h2>Summary</h2>

                            <Stack flexDirection='row' justifyContent='space-between'>
                                <span>Original Price:</span>
                                <span>${total}</span>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <span>Discounts:</span>
                                <span>-$0</span>
                            </Stack>
                            <Divider />
                            <Stack flexDirection='row' justifyContent='space-between' pb={2}>
                                <span><b>Total:</b></span>
                                <span><b>${total}</b></span>
                            </Stack>

                            <Button 
                                width='100%' 
                                bgColor="var(--color-purple-300)" 
                                hoverBgColor="var(--color-purple-400)" 
                                fontWeight="700"
                                type="submit"
                            >
                                Checkout
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </PaymentContainer>
    );
}