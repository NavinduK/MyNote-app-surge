import styled from "styled-components";
import { mobile } from "../responsive";
import Notes from "../components/Notes";
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

const Home = () => {
    return (
        <>
        <Navbar />
        <Container>
            <Wrapper>
                <Notes/>
            </Wrapper>
        </Container>
        </>
    );
};

export default Home;
