import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const TextArea = styled.textarea`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const UpdateNoteModel = ({ open, setOpen, updateData, setUpdateData }) => {
    const dispatch = useDispatch();
    const { updateNote } = bindActionCreators(actions, dispatch);

    const handleClose = () => {
        setOpen(false);
    };

    const { handleSubmit } = useForm({
        mode: "onBlur"
    });

    const onUpdateNote = (data, event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let noteEvent = Object.fromEntries(formData.entries());
        updateNote(updateData.id, noteEvent, JSON.parse(localStorage.getItem('token'))).then(() => {
            setOpen(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Update A Note</h2>
                    <div id="parent-modal-description">
                        <Form onSubmit={handleSubmit(onUpdateNote)}>
                            <Input onChange={(e) => setUpdateData(prev => ({ ...prev, title: e.target.value }))}
                                required type="text" name="title" placeholder="Title" value={updateData.title}
                            />
                            <TextArea onChange={(e) => setUpdateData(prev => ({ ...prev, description: e.target.value }))}
                                required type="text" rows="6" name="description" value={updateData.description}
                                placeholder="Description"
                            />
                            <Button type="submit">Update Note</Button>
                            <Button onClick={handleClose}>Close</Button>
                        </Form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default UpdateNoteModel;