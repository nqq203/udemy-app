import { Link } from "react-router-dom";

//MUI Components
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

//Local Imports
import CardItemCard from "./cartItemCard";
import { CartContainer } from "./cartStyles";
import { Button } from "../../components/Button/Button";
import { courses } from "../data/courses";

export default function Cart() {
    const total = courses.reduce((acc, course) => acc + course.price, 0);
    return (
      <CartContainer>
        <h1>Shopping Cart</h1>

        <div>
            <p><b>{courses.length} Courses in Cart</b></p>
        </div>

        <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
                {courses.map((course, index) => {
                    return (
                        <CardItemCard key={index} course={course} />
                    )
                })}
            </Grid>

            <Grid item xs={12} md={3}>
                <div>
                    <h4>Total:</h4>
                    <h1>${total}</h1>
                    <Link to="/payment/checkout">
                        <Button 
                            width='100%' 
                            fontWeight="700" 
                            bgColor="var(--color-purple-300)"
                            hoverBgColor="var(--color-purple-400)"
                        >
                            Checkout
                        </Button>
                    </Link>
                </div>

                <Divider sx={{margin: '16px 0'}}/>
                
                <div>
                    <p>Promotions</p>
                    <Stack flexDirection='row'>
                        <TextField variant="outlined" label="Enter Coupon" fullWidth/>
                        <Button>Apply</Button>
                    </Stack>
                </div>
            </Grid>
        </Grid>
      </CartContainer>
    )
}