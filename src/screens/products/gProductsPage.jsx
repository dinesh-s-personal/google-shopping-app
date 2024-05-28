import React from "react";
import { TopNavBar } from "./topNavigationMenu";
import { Col, Container, Row } from "react-bootstrap";
import ProductItem from "./productItem";
import { LeftFilterMenu } from "./leftFilterMenu";

export const ProductsList = () => {
    return <div>
        <TopNavBar />
        <Container fluid className="mt-4">
            <Row>
                <Col md={3}>
                    <LeftFilterMenu />
                </Col>
                <Col md={9}>
                    <ProductItem />
                </Col>
            </Row>
        </Container>
    </div>
}