import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";
import Box from '@mui/material/Box';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Spinner() {
    return (
        <Container>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </Container>

    );
}
