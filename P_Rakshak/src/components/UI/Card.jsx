import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function CardElement({ children }) {
    return (
        <Card style={{width:"50%",margin:"auto"}}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}