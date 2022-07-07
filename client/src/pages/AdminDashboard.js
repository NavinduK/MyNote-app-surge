import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import User from "../components/SingleUser";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { useNavigate } from 'react-router'
import AddUserModel from '../components/AddUserModel';
import ViewUserModel from '../components/ViewUserModel';

const Container = styled.div`
  width: 100vw;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 55%;
  padding: 20px;
  ${mobile({ width: "75%" })}
`;

const Button = styled.button`
  border-radius: 40px;
  border: none;
  padding: 20px 35px;
  background-color: maroon;
  color: white;
  cursor: pointer;
  font-size:18px;
  margin : 10px auto;
`;

export default function AdminDashboard() {
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { fetchUsers } = bindActionCreators(actions, dispatch);
    const navigate = useNavigate();

    const [open1, setOpen1] = useState(false);
    const [viewData, setViewData] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Container>
            <Wrapper>
                <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                    <Button onClick={() => setOpen1(true)}>Add new User</Button>
                    <Grid item xs={12}>
                        <h2 style={{ textAlign: 'center'}}>Current Users In the System</h2>
                        <Grid container justifyContent="center" spacing={1}>
                            {users.allUsers && users.allUsers.data.map((data, index) => (
                                <User key={index} user={data} setViewData={setViewData} />
                            ))}
                        </Grid>
                        <AddUserModel open={open1} setOpen={setOpen1} />
                        <ViewUserModel viewData={viewData} setViewData={setViewData} />
                    </Grid>
                </Grid>
            </Wrapper>
        </Container>
    );
}
