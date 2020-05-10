import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from 'react-bootstrap/Container';

const LoadingSkeleton = () => (
  <Container fluid="md" className="mt-5">
    <Skeleton animation="wave" height={70} width="60%" />
    <Skeleton animation="wave" width="20%" className="mt-3" />
    <Skeleton animation="wave" height={10} width="30%" />
    <div className="mb-5" />

    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />

    <Skeleton animation="wave" height={40} width="30%" />

    <Skeleton animation="wave" variant="rect" height={200} />

    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
    <Skeleton animation="wave" />
  </Container>
);

export default LoadingSkeleton;
