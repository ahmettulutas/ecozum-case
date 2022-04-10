import React from 'react'
import logo from './assets/ecozum.jpeg';
import { UserOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { selectAuth } from './auth/AuthSlice';
export default function HeaderComponent() {
    
  const {user} = useSelector(selectAuth);
  return (
    <Row style={{display:"flex",justifyContent:"space-between", maxHeight:"70px", padding:"1rem", width:"100%", backgroundColor:"white"}}>
        <Col span={2}>
            <img style={{flex:1, height:"auto"}} alt="ecozum" src={logo} />
        </Col>
        <Col style={{display:'flex', alignItems:"center", justifyContent:'flex-end'}} span={22}>
            <UserOutlined style={{fontSize:'30px'}}/>
            <p>{user.fullName}</p>
        </Col>

    </Row>
  )
}
