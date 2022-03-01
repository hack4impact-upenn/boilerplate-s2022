import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    margin: 'auto',
  },
  box: {
    backgroundColor: '#ededed',
    width: '60%',
    height: '60%',
    padding: '30px 100px',
    borderRadius: '10px',
    boxShadow: '1px 1px 10px rgba(0,0,0,0.2)',
  },
  header: {
    color: '#363636',
    fontSize: '80px',
  },
  body: {
    color: '#636363',
    fontSize: '20px',
  },
};

function NotFoundPage() {
  const [hover, setHover] = useState(false);

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.header}>404!</h1>
        <p style={styles.body}>
          Page Not Found - the page you&apos;re looking for doesn&apos;t exist
          or an error occurred :(
        </p>
        <p style={{ ...styles.body, color: '#57d9eb' }}>
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
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
