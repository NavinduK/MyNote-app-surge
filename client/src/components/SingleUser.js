import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';

export default function Singleuser({ user, setViewData }) {

    return (
        <Card onClick={() => setViewData(user)} sx={{ margin: "10px",  
            cursor:"pointer", backgroundColor: user.status?"#d1e7b7": "#fadbda"
            }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {user.firstName && user.lastName ? user.firstName + " " + user.lastName : user.email}
                </Typography>
                <Typography variant="body2">
                    ID : {user._id}
                </Typography>
            </CardContent>
        </Card>
    );
}
