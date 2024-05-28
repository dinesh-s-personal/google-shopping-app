import React from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';

export const LeftFilterMenu = () => {
  return (
    <div>
        <Card className='products-form'>
        <Card.Header className='products-form card-header'>Filters</Card.Header>
        <ListGroup>
            <ListGroup.Item className='products-form'>
            <Form.Check className='listgroup-item-checked'
                type="checkbox" 
                id="category1" 
                label="Phones" 
                defaultChecked
            />
            </ListGroup.Item>
            <ListGroup.Item className='products-form'>
            <Form.Check className='listgroup-item'
                type="checkbox" 
                id="category2" 
                label="Headphones" 
            />
            </ListGroup.Item>
            <ListGroup.Item className='products-form'>
            <Form.Check className='listgroup-item'
                type="checkbox" 
                id="category3" 
                label="Accessories" 
            />
            </ListGroup.Item>
        </ListGroup>
        </Card>
    </div>
  );
};