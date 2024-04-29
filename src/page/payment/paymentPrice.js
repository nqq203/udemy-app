import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { PayPalButtons } from "@paypal/react-paypal-js";

import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import { 
    PaymentLoading,
} from "./paymentStyles";
import Notification from "../../components/Notification/Notification";
import { changePriceFormat } from "../../utils/changePriceFormat";
import { callApiGetCartCourses } from "../../api/course";
import { callApiCreateOrder } from "../../api/order";
import { callApiDeleteAllCart } from "../../api/cart";

const getCourseDetails = async (courses) => {
    const courseDetails = await callApiGetCartCourses(courses);
    return courseDetails;
}

export default function PaymentPrice({ cartCourses }) {
    const navigate = useNavigate();
    const [notification, setNotification] = React.useState({});
    const { data, isLoading } = useQuery('courseDetails', () => getCourseDetails(cartCourses));
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

    const courses = data;
    if(isLoading){
        return (
            <PaymentLoading>
                <CircularProgress color="inherit" />
            </PaymentLoading>
        );
    }
    const courseData = courses?.metadata;
    const price = courseData.reduce((acc, course) => acc + course.price, 0)
    const totalPrice = changePriceFormat(price);

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
            const orderData = {
                userId: localStorage.getItem('_id'),
                items: courseData.map(course => {
                    return {
                        itemId: course._id,
                        price: course.price
                    }
                
                }),
                paymentId: details.id,
                totalPrice: price
            };

            orderMutation.mutate(orderData);
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

    return (
        <>
            <Notification message={notification.content} visible={notification.visible} onClose={() => setNotification({content: '', visible: false})}/>
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
                <Stack pb={2}>
                    <Stack flexDirection='row' justifyContent='space-between' marginBottom={1}>
                        <span><b>Total:</b></span>
                        <span><b>{totalPrice}$</b></span>
                    </Stack>
                    <h4 id="order-id-notification" 
                        style={{
                            display: "flex",
                            margin: "0",
                            justifyContent: "space-between",
                            visibility: "hidden"
                        }}>
                        <span>Order Code: </span>
                        <span id="order-id"></span>
                    </h4>
                </Stack>

                <PayPalButtons 
                    id="paypal-button"
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                />
            </Stack>
        </>
    );
}