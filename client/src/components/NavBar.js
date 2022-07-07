
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useNavigate } from 'react-router'

const Container = styled.div`
  height: 75px;
  background-color : white;
  box-shadow: 0px 0px 10px gray;
  margin-bottom:30px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  width:75%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color:green;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Item = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItem = styled.div`
  font-size: 15px;
  cursor: pointer;
  margin-left: 25px;
  background-color : green;
  padding : 10px 15px;
  color:white;
  border-radius:20px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const navigate = useNavigate();

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Link style={{ textDecoration: 'none' }} to="/"> <Logo>MY NOTE</Logo> </Link>
                </Left>
                <Center>
                </Center>
                <Right>
                    {user ?
                        <Wrapper>

                            {user.accountType === "admin" ?
                                <MenuItem
                                    onClick={() => {
                                        navigate('/admin');
                                    }}
                                >Admin Dashboard</MenuItem> : <Item>Logged as : {user.firstname} {user.lastname}</Item>
                            }
                            <MenuItem
                                onClick={() => {
                                    localStorage.removeItem("profile");
                                    localStorage.removeItem("token");
                                    setUser("");
                                    navigate('/login');
                                }}
                            >LOGOUT</MenuItem>
                        </Wrapper>
                        :
                        <Wrapper>
                            <Link style={{ textDecoration: 'none' }} to="/login"><MenuItem>LOGIN</MenuItem></Link>
                        </Wrapper>
                    }
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
