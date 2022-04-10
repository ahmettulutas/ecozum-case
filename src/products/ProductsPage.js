import React , {useEffect} from 'react';
import { Button, Col, Row, Tag } from 'antd';
import './products&payment.css'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, getProducts, addToCart } from './ProductsSlice';
/* import { products } from '../dummyfiles'; */

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, cart, totalAmount} = useSelector(selectProducts);
  useEffect(()=> {
    dispatch(getProducts());
  },[dispatch]);

  const handleAddToCart = (product) => {
    const {name,amount,id} = product;
    dispatch(addToCart({name:name, amount:amount, id:id}));
    console.log(cart)
  }
  return (
    <Row gutter={[0,10]} type="flex" align="top" className="main-container">
        <Row className="products-container" wrap={true} type="flex" justify="center">
            {products && products.map(product => (
            <Col className="card-container" onClick={() => handleAddToCart(product)} xs={24} md={11} xl={9} key={product.id}>
                <Row className="card-container-inner" style={{outline:cart.find(item => item.id === product.id) ? "4px solid lightgreen": "4px solid gray"}}>
                        <img className="product-image" src={product.imagePath} alt={product.name}/>
                    <Col style={{margin:"0 auto", justifyContent:"space-around", display:"flex", flexDirection:"column"}} xs={14}>
                            <Col style={{marginTop:"0.6rem", display:"flex",flexWrap:"wrap", width:"100%", justifyContent:"space-around"}}>
                                <h2 style={{fontWeight:"bold", fontSize:"1em"}}>{product.name}</h2>
                                <h2 style={{fontWeight:"bold", fontSize:"1em"}}>{product.amount}{product.currency}</h2>
                            </Col>
                            <Col style={{borderBottom:"1px solid black", margin:'auto 0', justifyContent:"space-around", fontSize:"14px", display:"flex",flexWrap:"wrap"}}>
                                {product.details.map(detail => (
                                    <p key={detail}>{detail}</p>
                                ))}
                            </Col>
                            <Col style={{padding:'0.2rem', alignItems:"center", fontSize:"14px", display:"flex", flexWrap:"wrap", justifyContent:'space-around'}}>
                                {product.tags.map(tag => (
                                    <Tag color="gray" key={tag}>{tag}</Tag>
                                ))}
                            </Col>
                    </Col>  
                </Row> 
            </Col>
            ))}
            <Row type="flex" justify="space-between" style={{width:"100%", margin:'0.5rem', borderTop:'2px solid gray', padding:"1rem", fontSize:"20px"}}>
                <p>Seçilen Paket Tutarı: <strong>{totalAmount}₺</strong></p>
                <Button type="primary">
                    <Link to="/cart">Ödeme Yap</Link>
                </Button>
            </Row> 
        </Row>

    </Row>  
)}
