import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  box-shadow: 0px 0px 10px gray;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const SubTitle = styled.h3`
  font-size: 20px;
  font-weight: 300;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 25px;

`;

const Button = styled.button`
  border-radius: 25px;
  border: none;
  padding: 10px 15px;
  background-color: green;
  color: white;
  cursor: pointer;
  margin:auto;
  margin-top: 10px;


`;

const Reg = styled.span`
  font-size: 12px;
  cursor: pointer;
`;

const Error = styled.p`
  text-align: center;
  margin: 10px 0;
  color: red;
`;

const Login = () => {
    const [error, setError] = useState();
    const [content, setContent] = useState(1);
    const [userId, setUserId] = useState();
    const dispatch = useDispatch();
    const { login, updatePass, updateUser } = bindActionCreators(actions, dispatch);
    const navigate = useNavigate();

    const { handleSubmit } = useForm({
        mode: "onBlur"
    });

    const onLogin = (data, event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let loginEvent = Object.fromEntries(formData.entries());
        console.log(data);
        login(loginEvent).then((res) => {
            console.log("user : ", res);
            setUserId(res.profile.userId);
            setError('');
            if (res.profile.status) {
                localStorage.setItem("profile", JSON.stringify(res.profile));
                localStorage.setItem("token", JSON.stringify(res.token));
                navigate('/');
            } else
                setContent(2);
        }).catch((err) => {
            setError("Something wrong, Try again!" && err.response.data.msg);
            console.log(err);
        })
    }

    const onResetPass = (data, event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let passEvent = Object.fromEntries(formData.entries());
        if (passEvent.password === passEvent.password2)
            updatePass(userId, { password: passEvent.password }).then(() => {
                setError('');
                setContent(3);
            }).catch((err) => {
                setError("Something wrong, Try again!" && err.response.data.msg);
                console.log(err);
            })
        else
            setError("Both passwords must be same!");
    }

    const addUserData = (data, event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let userEvent = Object.fromEntries(formData.entries());
        userEvent.status = true;
        updateUser(userId, userEvent).then(() => {
            setError('');
            setContent(1);
        }).catch((err) => {
            setError("Something wrong, Try again!" && err.response.data.msg);
            console.log(err);
        })
    }

    return (
        <Container>
            {content === 2 ?
                (<Wrapper>
                    <Title>RESET PASSWORD</Title>
                    <SubTitle>When logging for the 1st time</SubTitle>
                    <Form onSubmit={handleSubmit(onResetPass)}>
                        <Input name="password" type="password" placeholder="Password" />
                        <Input name="password2" type="password" placeholder="Confirm Password" />
                        {error ?
                            <Error>{error}</Error> : <></>
                        }
                        <Button type="submit">NEXT</Button>
                        <Link style={{ margin: '10px auto 0 auto', textDecoration: 'none' }} to={"/signup"}><Reg>CANCEL</Reg></Link>
                    </Form>
                </Wrapper>)
                : content === 3 ?
                    (<Wrapper>
                        <Title>FILL USER DETAILS</Title>
                        <Form onSubmit={handleSubmit(addUserData)}>
                            <Input required name="firstName" type="text" placeholder="First Name" />
                            <Input required name="lastName" type="text" placeholder="Last Name" />
                            <Input required name="dateOfBirth" type="date" placeholder="Date of Birth" />
                            <Input required name="mobile" type="number" placeholder="Mobile Number" />
                            {error ?
                                <Error>{error}</Error> : <></>
                            }
                            <Button type="submit">FINISH</Button>
                            <Link style={{ margin: '10px auto 0 auto', textDecoration: 'none' }} to={"/signup"}><Reg>CANCEL</Reg></Link>
                        </Form>
                    </Wrapper>)
                    :
                    (<Wrapper>
                        <Title>LOGIN</Title>
                        <Form onSubmit={handleSubmit(onLogin)}>
                            <Input name="email" type="email" placeholder="Email" />
                            <Input name="password" type="password" placeholder="Password" />
                            {error ?
                                <Error>{error}</Error> : <></>
                            }
                            <Button type="submit">LOGIN</Button>
                            <Link style={{ margin: '10px auto 0 auto', textDecoration: 'none' }} to={"/signup"}><Reg>CANCEL</Reg></Link>
                        </Form>
                    </Wrapper>)
            }
        </Container>
    );
};

export default Login;
