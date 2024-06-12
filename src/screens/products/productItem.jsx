import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ProductCard = ({ product, cardClick }) => {
  return (
    <Card className='card-full' onClick={() => cardClick(product)}>
      <Card.Img className='card-img' variant="top" src={product.image_file}/>
      <Card.Body>
        <Card.Title className='card-title'>
            <div className='prod-title'>
                {product.name}
            </div>
            <div className='prod-price'>
                {'Rs.'} {product.price}
            </div>
        </Card.Title>
        <Card.Text className='card-text'>{product.description}</Card.Text>
        <Button variant="primary">Buy Now</Button>
      </Card.Body>
    </Card>
  );
};

const ProductModal = ({ show, onHide, product }) => (
  <Modal
    show={show}
    onHide={onHide}
    dialogClassName="modal-90w"
    aria-labelledby="example-custom-modal-styling-title"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-custom-modal-styling-title">
        {product ? product.name : ''}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Image src={product ? product.image_file: ''} rounded />
      </Row>
      <p>
        {product ? product.description: ''}
      </p>
    </Modal.Body>
    <Modal.Footer style={{justifyContent: 'flex-start'}}>
      <div>
        {'Rs.'} {product ? product.price : ''}
      </div>
    </Modal.Footer>
  </Modal>
);

const ProductItem = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const products = useSelector((state) => state.products.products);
  const selectedCategories = useSelector((state) => state.products.filters.categories);

  const filteredProducts = selectedCategories.length
    ? products.filter((product) => selectedCategories.includes(product.category) && product.active === true)
    : products.filter((product) => product.active === true);
  
  return (
    <div>
      <Row xs={1} md={3} className="g-4">
        {filteredProducts && filteredProducts.map((product, index) => (
            <Col key={index}>
              <ProductCard product={product} cardClick={handleCardClick}/>
            </Col>
        ))} 
      </Row>

      <ProductModal show={showModal} onHide={handleClose} product={selectedProduct} />
      
    </div>
  );
};

export default ProductItem;