import React, { useState } from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Note from "./SingleNote";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router'
import { useEffect } from 'react';
import AddModel from './AddModel';

const Button = styled.button`
  border-radius: 40px;
  border: none;
  padding: 20px 35px;
  background-color: green;
  color: white;
  cursor: pointer;
  margin:auto;
  margin-top: 10px;
  font-size:18px;
`;

export default function Notes() {
    const notes = useSelector((state) => state.notes.notes);
    const dispatch = useDispatch();
    const { fetchNotes } = bindActionCreators(actions, dispatch);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchNotes(JSON.parse(localStorage.getItem("token")));
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 12, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Button onClick={()=>setOpen(true)}>Add a note</Button>
                {notes && notes.data.map((data, index) => (
                    <Note key={index} note={data} />
                ))}
            </Grid>
            <AddModel open={open} setOpen={setOpen} />
        </Box>
    );
}
