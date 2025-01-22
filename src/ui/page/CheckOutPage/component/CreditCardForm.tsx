import {CardContent, FormControl, FormLabel, Input, InputAdornment} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

export const CreditCardForm = ()=>{
    return(
        <CardContent
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                gap: 1.5,
            }}
        >
            <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Card number</FormLabel>
                <Input
                    endAdornment={
                        <InputAdornment position="end">
                            <CreditCardIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>Expiry date</FormLabel>
                <Input
                    endAdornment={
                        <InputAdornment position="end">
                            <CreditCardIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl>
                <FormLabel>CVC/CVV</FormLabel>
                <Input
                    endAdornment={
                        <InputAdornment position="end">
                            <InfoOutlined />
                        </InputAdornment>
                    }
                />

            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
                <FormLabel>Card holder name</FormLabel>
                <Input placeholder="Enter cardholder's full name" />
            </FormControl>
        </CardContent>
    );
}