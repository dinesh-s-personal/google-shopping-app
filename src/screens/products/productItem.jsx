import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useGetProductDetailsQuery } from '../../redux/service/users';

const ProductCard = ({ title, description }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src="./ProductAppImages/Group 3760/Group 3760.png"/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Buy Now</Button>
      </Card.Body>
    </Card>
  );
};

const ProductItem = () => {

  const {isLoading, isError, data} = useGetProductDetailsQuery(null, { refetchOnMountOrArgChange: true });

  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {!isLoading && !isError && data && data.map((product, index) => (
            <Col key={index}>
              <ProductCard key={index} title={product.name} description={product.description} />
            </Col>
        ))} 
      </Row>
    </div>
  );
};

export default ProductItem;