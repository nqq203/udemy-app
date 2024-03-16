import * as React from 'react';
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CartItemDescription, CartItemName } from './cartStyles';

const CardStyles = {
    marginBottom: '16px', 
    padding: '16px', 
    boxShadow: 'none', 
    border: '1px solid rgb(0, 0, 0, 0.2)'
}

export default function CardItemCard({ course }) {
  return (
    <Card sx={ CardStyles }>
        <Stack sx={{flexDirection: {xs: 'column', md: 'row'}, justifyContent: {xs: 'center', md: 'space-between'}}}>
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="/images/courses/reactnative.png"
                alt="React Native"
            />

            <Stack flexDirection='row' justifyContent='center'>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <CartItemName variant="h6" fontWeight={600}>
                        {course.name}
                    </CartItemName>

                    <CartItemDescription>
                        By {course.instructor}
                    </CartItemDescription>

                    <Rating name="half-rating-read" value={course.rating} precision={0.5} readOnly />
                    
                    <CartItemDescription>
                        {course.learnHours} hours - {course.lectures} lectures
                    </CartItemDescription>
                </CardContent>
            </Stack>

            <Stack flexDirection='column' justifyContent='center' alignItems={{xs: 'center', md: 'flex-end'}}>
                <a>Remove</a>
                <a>Save for later</a>
                <a>Move to wishlist</a>
            </Stack>

            <Stack flexDirection='column' justifyContent='center' alignItems='center'>
                <h2>${course.price}</h2>
            </Stack>
        </Stack>
    </Card>
  );
}