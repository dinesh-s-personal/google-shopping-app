import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProductCard = ({ title, description, imageName, price }) => {
  return (
    <Card className='card-full'>
      <Card.Img className='card-img' variant="top" src={imageName}/>
      <Card.Body>
        <Card.Title className='card-title'>
            <div className='prod-title'>
                {title}
            </div>
            <div className='prod-price'>
                {'Rs.'} {price}
            </div>
        </Card.Title>
        <Card.Text className='card-text'>{description}</Card.Text>
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
              <ProductCard key={index} title={product.name} description={product.description} 
                          imageName={product.image_file} price={product.price}/>
            </Col>
        ))} 
      </Row>
    </div>
  );
};

export default ProductItem;