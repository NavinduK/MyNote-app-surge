import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Note from "./SingleNote";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router'
import AddModel from './AddNoteModel';
import UpdateModel from './UpdateNoteModel';

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

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [updateData, setUpdateData] = useState({
        id: '', title: '', description: ''
    });

    useEffect(() => {
        fetchNotes(JSON.parse(localStorage.getItem("token")));
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 12, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Button onClick={() => setOpen1(true)}>Add a note</Button>
                {notes && notes.data.map((data, index) => (
                    <Note key={index} note={data} setOpen={setOpen2} setUpdateData={setUpdateData} />
                ))}
            </Grid>
            <AddModel open={open1} setOpen={setOpen1} />
            <UpdateModel open={open2} setOpen={setOpen2} updateData={updateData} setUpdateData={setUpdateData} />
        </Box>
    );
}
