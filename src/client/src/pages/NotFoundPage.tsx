import styled from 'styled-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { createStore } from 'redux';
// import reducers from '../redux/store/reducers';

const Container = styled.div`
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  margin: 'auto'
`;

const Box = styled.div`
  backgroundColor: '#ededed',
  width: '60%',
  height: '60%',
  padding: '30px 100px',
  borderRadius: '10px',
  boxShadow: '1px 1px 10px rgba(0,0,0,0.2)'
`;

const Header = styled.h1`
  color: '#363636',
  fontSize: '80px',
`;

const Body = styled.p`
  color: '#636363',
  fontSize: '20px',
`;

function NotFoundPage() {
  // const store = createStore(reducers);

  const [hover, setHover] = useState(false);

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  return (
    <Container>
      <Box>
        <Header>404!</Header>
        <Body>
          Page Not Found - the page you&apos;re looking for doesn&apos;t exist
          or an error occurred :(
        </Body>
        <Body style={{ color: '#57d9eb' }}>
          <Link
            onMouseEnter={() => mouseEnter()}
            onMouseLeave={() => mouseLeave()}
            style={
              hover
                ? {
                    textDecoration: 'none',
                    color: '#328f9c',
                    transition: '0.3s',
                  }
                : {
                    textDecoration: 'none',
                    color: '#57d9eb',
                    transition: '0.3s',
                  }
            }
            to="/"
          >
            &larr; Click here to go back.
          </Link>
        </Body>
      </Box>
    </Container>
  );
}

export default NotFoundPage;

