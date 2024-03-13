import {Box,Rating} from "@mui/material"
import StarIcon from '@mui/icons-material/Star';

export const CustomRating = ({rates}) => {
    const value = parseFloat(rates) || 0;
  
    return (
      <Box
        sx={{
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontWeight: 600}}>{value}</Box>

        <Rating
          name="text-feedback"
          value={value}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          sx={{
            marginLeft: '4px',
            fontSize: '1.2rem',
            
          }}
        />
        
      </Box>
    );
}