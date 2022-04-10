import { Col, Row } from 'antd'
import React from 'react'
import {useSelector} from "react-redux";
import { selectProducts} from './ProductsSlice';

export default function CartDetails() {
  const {cart} = useSelector(selectProducts);
  return (
    <Row type="flex" style={{flexDirection:"column"}}>
        <Col>
            <h3>Sepetteki Paketler</h3>
        </Col>
        {cart.map((product,index) => (
        <Col key={index} className="cart-items">
            <Row>
                {product.name}
            </Row>
            <Row>
                <strong>{product.amount}₺</strong>
            </Row>
        </Col>
        ))}
    </Row>
  )
}
