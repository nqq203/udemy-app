import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import PaymentIcon from '@mui/icons-material/Payment';
import WalletIcon from '@mui/icons-material/Wallet';

import Notification from "../../components/Notification/Notification";
import { 
    PaymentContainer, 
    PaymentInfoContainer, 
    PaymentInfoItem,
    PaymentLoading,
} from "./paymentStyles";

import { countries } from "../data/country";
import { callApiCreateOrder } from "../../api/order";
import { changePriceFormat } from "../../utils/changePriceFormat";
import { CircularProgress } from "@mui/material";
import { callApiDeleteAllCart, callApiGetAllCart } from "../../api/cart";
import PaymentOrder from "./paymentOrder";
import PaymentPrice from "./paymentPrice";

const getCartCourses = async () => {
    const cart = await callApiGetAllCart();
    return cart;
}

export default function Payment() {
    const navigate = useNavigate();
    const [choice, setChoice] = React.useState('');
    const [expanded, setExpanded] = React.useState('');
    const [notification, setNotification] = React.useState({});
    const { data, isLoading } = useQuery('cart', () => getCartCourses());

    const orderMutation = useMutation(
        (orderDetails) => callApiCreateOrder(orderDetails), 
        {
            onSuccess: (data) => {
                if(data.success){
                    callApiDeleteAllCart();
                    navigate('/payment/success');
                }
                else{
                    setNotification({
                        content: data.message, 
                        visible: true
                    });
                }
            }
        }
    )

    const cart = data;
    if(isLoading){
        return (
            <PaymentLoading>
                <CircularProgress color="inherit" />
            </PaymentLoading>
        );
    }
    const cartData = cart?.metadata;
    const cartCourses = cartData.map(cartItem => cartItem.itemId);
    const totalPrice = 600;

    const handleSelectCountryChange = (event) => {
        setChoice(event.target.value);
    };
    
    const handlePaymentMethodChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const form = event.target;
        const country = form.country.value;
        const paymentMethod = form.paymentMethod.value;
        var orderData = {};

        if (country === '') {
            setNotification({
                content: "Please select a country",
                visible: true,
            });
            return;
        }

        if(paymentMethod === '') {
            setNotification({
                content: "Please select a payment method",
                visible: true,
            });
            return;
        }
        else if(paymentMethod === 'card') {
            orderData = {
                userId: localStorage.getItem('_id'),
                items: cartData.map(cartItem => {
                    return {
                        courseId: cartItem.itemId,
                        price: 100
                    }
                
                }),
                country: form.country.value,
                paymentMethod: form.paymentMethod.value,
                cardName: form.firstname.value,
                cardNumber: form.cardnumber.value,  
                cardMonth: form.month.value,
                cardYear: form.year.value,
                cardCVC: form.cvv.value,
                totalPrice: totalPrice
            };

            if(orderData.cardName === '' 
            || orderData.cardNumber === '' 
            || orderData.cardMonth === '' 
            || orderData.cardYear === '' 
            || orderData.cardCVC === '') {
                alert('Please fill out all required fields');
                return;
            }
        }
        else if (paymentMethod === 'paypal') {
            orderData = {
                userId: localStorage.getItem('_id'),
                items: cartData.map(cartItem => {
                    return {
                        itemId: cartItem._id,
                        price: 100
                    }
                
                }),
                country: form.country.value,
                paymentMethod: form.paymentMethod.value,
                totalPrice: totalPrice
            };
        }

        orderMutation.mutate(orderData);
    };

    return (
        <PaymentContainer>
            {cartData.length === 0 ? (
                <Stack justifyContent="center" alignItems="center">
                    <Typography variant="h4" fontWeight={800} fontFamily={"serif"}>There is something wrong :c</Typography>
                </Stack>
            ) : (
                <>
                    <Notification message={notification.content} visible={notification.visible} onClose={() => setNotification({content: '', visible: false})}/>
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
                                                        The amount you will be charged by Paypal is {totalPrice}VNĐ.
                                                    </h4>
                                                </AccordionDetails>
                                            </Accordion>
                                        </RadioGroup>
                                    </FormControl>
                                </PaymentInfoItem>
        
                                <PaymentInfoItem>
                                    <h2>Order details</h2>
                                    <PaymentOrder cartCourses={cartCourses} />
                                </PaymentInfoItem>
                            </Grid>
        
                            <Grid item xs={12} md={5} px={10} sx={{backgroundColor: 'var(--color-gray-100)'}}>
                                <PaymentPrice cartCourses={cartCourses} />
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </PaymentContainer>
    );
}