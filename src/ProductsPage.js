import { Badge, Avatar, Card, Col, Divider, Image, List, Row, Space, Tag } from 'antd'
import React , {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, getProducts } from './products/ProductsSlice';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
export default function ProductsPage() {
  const dispatch = useDispatch();
  const {products} = useSelector(selectProducts);
  useEffect(()=> {
    dispatch(getProducts());
  },[])
  
  return (
      <Row gutter={[5,5]} wrap={true} type="flex" justify="center" align="middle" style={{ flexWrap:"wrap", backgroundColor:"#F2F2F2", minHeight:'100vh'}}>
           {products && products.map(product => (
            <Col className="card-container" sm={16}  lg={11} key={product.id}>
                <Row /* style={{padding:0, backgroundColor:"lightGray", borderRadius:"10px", overflow:"hidden"}} */>
                    <Col style={{display:"flex"}} span={6}>
                        <img style={{margin:0, maxWidth:"100%", height:'auto'}} src={product.imagePath} alt={product.name}/>
                    </Col>
                    <Col span={18}>
                    <Row style={{width:"100%"}}>
                        <Col style={{display:"flex", margin:"1rem", justifyContent:"space-around"}} span={24}>
                            <h1>{product.name}</h1>
                            <h1>{product.amount}{product.currency}</h1>
                        </Col>
                        <Col style={{padding:'0.5rem', display:"flex", justifyContent:'space-around', alignItems:"center"}} span={24}>
                            {product.details.map(detail => (
                                <h3 key={detail}>{detail}</h3>
                            ))}
                        </Col>
                        <Divider></Divider>
                        <Col style={{padding:'0.5rem', display:"flex", justifyContent:'center'}} span={24}>
                            {product.tags.map(tag => (
                                <Tag color="gray" key={tag}>{tag}</Tag>
                            ))}
                        </Col>
                        </Row>
                    </Col>  

                </Row> 
            </Col>
          ))}
      </Row>
        
    )}
