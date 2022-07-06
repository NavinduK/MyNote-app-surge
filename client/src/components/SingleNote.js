import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function SingleNote({note}) {
  return (
    <Card sx={{ width: "100%", marginTop:"20px", }}>
      <CardContent>
        <Typography variant="h5" component="div">
        {note.title}
        </Typography>
        <Typography variant="body2">
        {note.description}
        </Typography>
      </CardContent>
      <CardActions sx={{marginTop:'auto'}}>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
