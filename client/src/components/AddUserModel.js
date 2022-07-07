import React, { useState } from 'react';
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

const Error = styled.p`
  text-align: center;
  margin: 10px 0;
  color: red;
`;

const AddUserModel = ({ open, setOpen }) => {
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const { addUser } = bindActionCreators(actions, dispatch);

    const handleClose = () => {
        setOpen(false);
        setError("");
    };

    const { handleSubmit } = useForm({
        mode: "onBlur"
    });

    const onAdddUser = (data, event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let userEvent = Object.fromEntries(formData.entries());
        addUser(userEvent).then(() => {
            setOpen(false);
            setError("");
        }).catch((err) => {
            setError("Something wrong, Try again!" && err.response.data.msg);
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
                    <h2 id="parent-modal-title">Add New User</h2>
                    <div id="parent-modal-description">
                        <Form onSubmit={handleSubmit(onAdddUser)}>
                            <Input required type="email" name="email" placeholder="Email" />
                            <Input required type="password" name="password" placeholder="Password" />
                            {error ?
                                <Error>{error}</Error> : <></>
                            }
                            <Button type="submit">Add User</Button>
                            <Button onClick={handleClose}>Close</Button>
                        </Form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AddUserModel;