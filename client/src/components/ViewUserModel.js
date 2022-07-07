import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styled from "styled-components";

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

const Detail = styled.p`
  padding-left: 10px;
`;

const ViewUserModel = ({ viewData, setViewData }) => {
    const handleClose = () => {
        setViewData('');
    };
    return (
        <div>
            <Modal
                open={viewData?true:false}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 250 }}>
                    <div id="parent-modal-description">
                        <Detail>First Name : <b>{viewData.firstName ? viewData.firstName : "-"}</b></Detail>
                        <Detail>Last Name : <b>{viewData.lastName ? viewData.lastName : "-"}</b></Detail>
                        <Detail>Email : <b>{viewData.email ? viewData.email : "-"}</b></Detail>
                        <Detail>Phone No : <b>{viewData.mobile ? viewData.mobile : "-"}</b></Detail>
                        <Detail>Date of Birth : <b>{viewData.dateOfBirth ? viewData.dateOfBirth.split("T")[0] : "-"}</b></Detail>
                        <Detail>status : <b>{viewData.status ? "Active" : "Inactive"}</b></Detail>
                        <Detail>Account Type : <b>{viewData.accountType ? viewData.accountType : "-"}</b></Detail>
                    </div>
                    <Button sx={{ marginTop: '10px' }} onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default ViewUserModel;