import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const ErrorPage = ({ languageData }) => (
  <Container className="my-2 text-center">
    <h1 style={{ fontSize: '8rem' }}>:(</h1>
    <h1>Uncaught TypeError: undefined is not a function</h1>
    <h3>{languageData.errorPageDescription}</h3>
    <div className="my-5">
      <a href="/">
        <Image src="https://www.infoxication.net/wp-content/uploads/2020/04/3ye8qz.jpg" width={250} height={250} rounded={true} fluid={true} />
      </a>
    </div>
  </Container>
);

export default ErrorPage;
