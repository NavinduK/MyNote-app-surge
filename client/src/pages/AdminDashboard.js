import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import { Search } from "@material-ui/icons";
import User from "../components/SingleUser";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import AddUserModel from '../components/AddUserModel';
import ViewUserModel from '../components/ViewUserModel';
import Navbar from "../components/NavBar";

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
  background-color: green;
  color: white;
  cursor: pointer;
  font-size:18px;
  margin : 10px auto;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px auto;
  padding: 5px;
  width:50%;
  ${mobile({ width: '80%' })}
`;

const Input = styled.input`
  border: none;
  width:100%;
  border-radius:20px;
  height:35px;
  padding: 0 20px;
`;

export default function AdminDashboard() {
    const users = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { fetchUsers } = bindActionCreators(actions, dispatch);

    const [open1, setOpen1] = useState(false);
    const [viewData, setViewData] = useState('');

    const [search, setSearch] = useState();

    const onType = (e) => {
        setSearch(users.allUsers.data.filter(function (user) { 
            return user.email.toLowerCase().includes(e.target.value.toLowerCase()) || 
            (user.firstName && user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) )||
            (user.lastName && user.lastName.toLowerCase().includes(e.target.value.toLowerCase())) ||
            (user._id === e.target.value)
        }));
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <>
        <Navbar />
        <Container>
            <Wrapper>
                <Grid sx={{ flexGrow: 1 }} container spacing={1}>
                    <Button onClick={() => setOpen1(true)}>Add new User</Button>
                    <Grid item xs={12}>
                        <h2 style={{ textAlign: 'center' }}>Current Users In the System</h2>
                        <SearchContainer>
                            <Input onChange={onType} placeholder="Search by Email, Name or ID" />
                            <Search style={{ color: "green", fontSize: 20, marginLeft: "-30px" }} />
                        </SearchContainer>
                        <Grid container justifyContent="center" spacing={1}>
                            {
                                search ? ( search.length > 0 ? search.map((data, index) => (
                                    <User key={index} user={data} setViewData={setViewData} />
                                )): <p>No Users Found!</p>)
                                :
                                users.allUsers && users.allUsers.data.map((data, index) => (
                                    <User key={index} user={data} setViewData={setViewData} />
                                ))
                            }
                        </Grid>
                        <AddUserModel open={open1} setOpen={setOpen1} />
                        <ViewUserModel viewData={viewData} setViewData={setViewData} />
                    </Grid>
                </Grid>
            </Wrapper>
        </Container>
        </>
    );
}
