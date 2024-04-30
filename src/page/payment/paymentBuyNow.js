import React from "react";
import { useMutation, useQuery } from "react-query";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import Notification from "../../components/Notification/Notification";
import { 
    PaymentContainer, 
    PaymentImage, 
    PaymentInfoItem,
    PaymentLoading,
    PaymentSummaryContainer,
} from "./paymentStyles";
import { countries } from "../data/country";
import { callApiGetCourseByCId } from "../../api/course";
import { useNavigate, useParams } from "react-router-dom";
import { callApiCreateOrder } from "../../api/order";
import { changePriceFormat } from "../../utils/changePriceFormat";
import { Divider } from "@mui/material";
import { PayPalButtons } from "@paypal/react-paypal-js";

const getCourseDetails = async (course) => {
  const courseDetails = await callApiGetCourseByCId(course);
  return courseDetails;
}

export default function PaymentBuyNow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [choice, setChoice] = React.useState('');
    const [notification, setNotification] = React.useState({});
    const { data, isLoading } = useQuery('courseDetails', () => getCourseDetails(id));
    
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
    const courseData = courses?.metadata;
    const price = courseData?.price;
    const totalPrice = changePriceFormat(price);
    console.log(courseData);

    const handleSelectCountryChange = (event) => {
        setChoice(event.target.value);
    };

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
                  items: [{
                      name: courseData.name,
                      description: courseData.description,
                      unit_amount: {
                          currency_code: 'USD',
                          value: courseData.price
                      },
                      quantity: 1
                  }]
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
              items: [{
                itemId: courseData._id,
                price: courseData.price
              }],
              paymentId: details.id,
              totalPrice: price
          };

          orderMutation.mutate(orderData);
      });
  }


    return (
        <PaymentContainer>
            {courseData.length === 0 ? (
                <Stack height="400px" justifyContent="center" alignItems="center">
                    <Typography variant="h4" fontWeight={600}>There is something wrong.</Typography>
                </Stack>
            ) : (
                <>
                    <Notification message={notification.content} visible={notification.visible} onClose={() => setNotification({content: '', visible: false})}/>
                    <Typography variant="h4" fontWeight={800} fontFamily={"serif"}>Checkout</Typography>
        
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7} px={10}>
                            <PaymentInfoItem>
                                <h2>Billing address</h2>
                                <FormControl>
                                    <InputLabel id="country-choice">Country</InputLabel>
                                    <Select
                                        id="country"
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
                                <h2>Order details</h2>
                                <PaymentSummaryContainer>
                                  <Stack flexDirection='row' justifyContent="center" alignItems="center">
                                      <PaymentImage src={courseData.imageUrl} alt="test"></PaymentImage>
                                      <Typography variant="subtitle1" marginLeft={2} fontWeight={700}>
                                          {courseData.name}
                                      </Typography> 
                                  </Stack>
                                  <Typography variant="subtitle1">
                                      {totalPrice}$
                                  </Typography>
                                </PaymentSummaryContainer>
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
                        </Grid>
                    </Grid>
                </>
            )}
        </PaymentContainer>
    );
}