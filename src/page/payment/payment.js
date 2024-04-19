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
import Notification from "../../components/Notification/Notification";
import { 
    PaymentContainer, 
    PaymentSummaryContainer, 
    PaymentInfoItem,
    PaymentLoading,
    PaymentImage
} from "./paymentStyles";

import { countries } from "../data/country";
import { callApiCreateOrder } from "../../api/order";
import { changePriceFormat } from "../../utils/changePriceFormat";
import { callApiGetCartCourses } from "../../api/course";
import { CircularProgress } from "@mui/material";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

const course = ["661de8ca20d64b253d60ece9", "661e4284775e2501b826b249"];

const getCourseDetails = async (courses) => {
    const courseDetails = await callApiGetCartCourses(courses);
    return courseDetails;
  }

export default function Payment() {
    const navigate = useNavigate();
    const [choice, setChoice] = React.useState('');
    const [expanded, setExpanded] = React.useState('');
    const [notification, setNotification] = React.useState({});
    const { data, isLoading } = useQuery('courseDetails', () => getCourseDetails(course));

    const orderMutation = useMutation(
        (orderDetails) => callApiCreateOrder(orderDetails), 
        {
            onSuccess: (data) => {
                if(data.success){
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

    const courses = data;
    if(isLoading){
        return (
            <PaymentLoading>
                <CircularProgress color="inherit" />
            </PaymentLoading>
        );
    }
    const courseData = courses.metadata;
    const price = courseData.reduce((acc, course) => acc + course.price, 0)
    const totalPrice = changePriceFormat(price);

    var isPurchased = false;

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: price,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: price
                            }
                        }
                    },
                    items: courseData.map(course => {
                        return {
                            name: course.name,
                            description: course.name,
                            unit_amount: {
                                currency_code: 'USD',
                                value: course.price
                            },
                            quantity: 1
                        }
                    }),
                },
            ],
            application_context: {
                shipping_preference: 'NO_SHIPPING'
            }
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            document.getElementById("order-id-notification").style.visibility = "visible";
            document.getElementById("order-id").innerText = details.id;
            setNotification({
                content: `Transaction completed by ${name}, please Complete Checkout to finish the process.`,
                visible: true,
            });
            // alert(`Transaction completed by ${name}, please Complete Checkout to finish the process.`);
        });
    }

    // const onCreateOrder = async (data, actions) => {
    //     return fetch("http://localhost:8080/orders/create-paypal-order", {
    //         method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
    //         body: JSON.stringify({ "intent": intent })
    //     })
    //     .then((response) => response.json())
    //     .then((order) => { return order.id; });
    // }

    // const onApproveOrder = async (data, actions) => {
    //     let order_id = data.orderID;
    //     return fetch("http://localhost:8080/orders/complete-paypal-order", {
    //         method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
    //         body: JSON.stringify({
    //             "intent": intent,
    //             "order_id": order_id
    //         })
    //     })
    //     .then((response) => response.json())
    //     .then((order_details) => {
    //         console.log(order_details); 
    //         alert(`Transaction completed by ${order_details.payer.name.given_name}`);
    //      })
    //      .catch((error) => {
    //         console.log(error);
    //      });
    // }

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

        if(document.getElementById("order-id").innerText === '') {
            setNotification({
                content: "Please complete the payment process",
                visible: true,
            });
            return;
        }
        
        orderData = {
            userId: localStorage.getItem('_id'),
            items: courseData.map(course => {
                return {
                    itemId: course._id,
                    price: course.price
                }
            
            }),
            country: form.country.value,
            paymentMethod: form.paymentMethod.value,
            paymentId: document.getElementById("order-id").innerText,
            totalPrice: totalPrice
        };

        orderMutation.mutate(orderData);
    };

    return (
        <PaymentContainer>
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
                                            <PayPalButtons 
                                                id="paypal-button"
                                                style={{ layout: "vertical" }}
                                                createOrder={(data, actions) => onCreateOrder(data, actions)}
                                                onApprove={(data, actions) => onApproveOrder(data, actions)}
                                                fundingSource={FUNDING.CARD}
                                            />
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
                                                The amount you will be charged by Paypal is {totalPrice}$.
                                            </h4>
                                            <PayPalButtons 
                                                id="paypal-button"
                                                style={{ layout: "vertical", color: "silver" }}
                                                createOrder={(data, actions) => onCreateOrder(data, actions)}
                                                onApprove={(data, actions) => onApproveOrder(data, actions)}
                                                fundingSource={FUNDING.PAYPAL}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                </RadioGroup>
                            </FormControl>
                        </PaymentInfoItem>

                        <PaymentInfoItem>
                            <h2>Order details</h2>
                            {courseData.map((course, index) => {
                                const formatPrice = changePriceFormat(course.price);
                                return(
                                    <PaymentSummaryContainer key={index}>
                                        <Stack flexDirection='row' justifyContent="center" alignItems="center">
                                            <PaymentImage src={course.imageUrl} alt="test"></PaymentImage>
                                            <Typography variant="subtitle1" marginLeft={2} fontWeight={700}>
                                                {course.name}
                                            </Typography> 
                                        </Stack>
                                        <Typography variant="subtitle1">
                                            {formatPrice}$
                                        </Typography>
                                    </PaymentSummaryContainer>
                                );
                            })}
                            <h4 id="order-id-notification" style={{visibility: "hidden"}}>
                                <span>Order Code: </span>
                                <span id="order-id"></span>
                            </h4>
                        </PaymentInfoItem>
                    </Grid>

                    <Grid item xs={12} md={5} px={10} sx={{backgroundColor: 'var(--color-gray-100)'}}>
                        <Stack spacing={1}>
                            <h2>Summary</h2>

                            <Stack flexDirection='row' justifyContent='space-between'>
                                <span>Original Price:</span>
                                <span>{totalPrice}$</span>
                            </Stack>
                            <Stack flexDirection='row' justifyContent='space-between'>
                                <span>Discounts:</span>
                                <span>-0$</span>
                            </Stack>
                            <Divider />
                            <Stack flexDirection='row' justifyContent='space-between' pb={2}>
                                <span><b>Total:</b></span>
                                <span><b>{totalPrice}$</b></span>
                            </Stack>

                            <h4 id="order-id-notification" style={{visibility: "hidden"}}>
                                <span>Order Code: </span>
                                <span id="order-id"></span>
                            </h4>

                            <Button 
                                id="checkout-button"
                                width='100%' 
                                bgColor="var(--color-purple-300)" 
                                hoverBgColor="var(--color-purple-400)" 
                                fontWeight="700"
                                type="submit"
                                style={{}}
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