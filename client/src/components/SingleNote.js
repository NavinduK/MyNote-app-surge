import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

export default function SingleNote({ note, setOpen, setUpdateData }) {
    const dispatch = useDispatch();
    const { deleteNote } = bindActionCreators(actions, dispatch);

    return (
        <Card sx={{ width: "100%", marginTop: "20px", }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {note.title}
                </Typography>
                <Typography variant="body2">
                    {note.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: 'auto' }}>
                <Button onClick={() => {
                    setOpen(true);
                    setUpdateData({
                        id: note._id, title: note.title, description: note.description
                    })
                }} size="small">Edit</Button>
                <Button onClick={()=>deleteNote(note._id,JSON.parse(localStorage.getItem("token")))} size="small">Delete</Button>
            </CardActions>
        </Card>
    );
}
