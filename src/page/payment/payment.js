import React from "react";
import { useQuery } from "react-query";

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
    PaymentInfoItem,
    PaymentLoading,
} from "./paymentStyles";
import { countries } from "../data/country";
import { callApiGetAllCart } from "../../api/cart";
import PaymentOrder from "./paymentOrder";
import PaymentPrice from "./paymentPrice";

const getCartCourses = async () => {
    const cart = await callApiGetAllCart();
    return cart;
}

export default function Payment() {
    const [choice, setChoice] = React.useState('');
    const [notification, setNotification] = React.useState({});
    const { data, isLoading } = useQuery('cart', () => getCartCourses());

    const cart = data;
    if(isLoading){
        return (
            <PaymentLoading>
                <CircularProgress color="inherit" />
            </PaymentLoading>
        );
    }
    const cartData = cart?.metadata;
    const cartCourses = cartData?.map(cartItem => cartItem.itemId);

    const handleSelectCountryChange = (event) => {
        setChoice(event.target.value);
    };

    return (
        <PaymentContainer>
            {cartData?.length === 0 ? (
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
                                {cartCourses?.length === 0 ? (
                                        <></>
                                    ) : (
                                        <PaymentOrder cartCourses={cartCourses} />
                                    )
                                }
                            </PaymentInfoItem>
                        </Grid>
    
                        <Grid item xs={12} md={5} px={10} sx={{backgroundColor: 'var(--color-gray-100)'}}>
                            {cartCourses?.length === 0 ? (
                                    <></>
                                ) : (
                                    <PaymentPrice cartCourses={cartCourses} />
                                )
                            }
                        </Grid>
                    </Grid>
                </>
            )}
        </PaymentContainer>
    );
}