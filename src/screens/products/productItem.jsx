import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProductCard = ({ title, description, imageName }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={imageName}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Buy Now</Button>
      </Card.Body>
    </Card>
  );
};

const ProductItem = () => {

  const products = useSelector((state) => state.products.products);
  const selectedCategories = useSelector((state) => state.products.filters.categories);

  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product.category))
    : products;
  
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {filteredProducts && filteredProducts.map((product, index) => (
            <Col key={index}>
              <ProductCard key={index} title={product.name} description={product.description} imageName={product.image_file}/>
            </Col>
        ))} 
      </Row>
    </div>
  );
};

export default ProductItem;