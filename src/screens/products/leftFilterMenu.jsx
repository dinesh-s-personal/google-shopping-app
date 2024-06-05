import React from 'react';
import { Card, Form, ListGroup } from 'react-bootstrap';
import { setFilters } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

export const LeftFilterMenu = () => {

    const dispatch = useDispatch();

    const categories = [...new Set(useSelector((state) => state.products.products.map((product) => product.category)))];
    const selectedCategories = useSelector((state) => state.products.filters.categories);

    const handleFilterChange = (event) => {
        const { value } = event.target;
        const newCategories = selectedCategories.includes(value)
          ? selectedCategories.filter((category) => category !== value)
          : [...selectedCategories, value];
        dispatch(setFilters(newCategories));
    };

    return (
        <div>
            <Card className='products-form'>
            <Card.Header className='products-form card-header'>Filters</Card.Header>
            <ListGroup>
                {
                    categories.map((category) => (
                        <ListGroup.Item className='products-form'>
                            <Form.Check className={selectedCategories.includes(category) ? 'listgroup-item-checked':'listgroup-item'}
                                type="checkbox" 
                                id={category} 
                                label={category} 
                                value={category}
                                onChange={handleFilterChange}
                                checked={selectedCategories.includes(category)}
                            />
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            </Card>
        </div>
    );
};