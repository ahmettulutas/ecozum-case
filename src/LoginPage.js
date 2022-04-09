import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, MailOutlined  } from '@ant-design/icons';
import "antd/dist/antd.css";
import { useSelector } from 'react-redux';
import { selectAuth } from './auth/AuthSlice';
import { Navigate } from 'react-router-dom';

export default function NormalLoginForm () {
    const {error} = useSelector(selectAuth);
    const {isLoggedIn} = useSelector(selectAuth);
    const onFinish = values => {
          console.log('Received values of form: ', values);
        };
    if(isLoggedIn) {
        return <Navigate to="/"/>
        }
    return (
        <Row type="flex" justify="center" align="middle" style={{padding:"1rem", backgroundColor:"#F2F2F2", minHeight:'100vh'}}>
            <Col style={{borderRadius:'15px', backgroundColor:"white", padding:"2rem", boxShadow:"3px 4px 5px 0px lightGray"}} s={{span:18}} md={{span:10}} lg={{span:6}}>
                <Form
                    validateStatus={error ? "error" : "success"}
                    colon={false}
                    layout="vertical"
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        label="Full name"                       
                        name="fullName"
                        rules={[
                            {   
                                required: true,
                                message: 'Please input your Username!',
                            }

                        ]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="full name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                type:"email",
                                required: true,
                                message: 'Please input your email!',
                            }

                        ]}>   
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="email"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
  );
};
