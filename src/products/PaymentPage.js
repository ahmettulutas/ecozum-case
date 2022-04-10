import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Cleave from 'cleave.js/react';
import moment from 'moment';
import CartDetails from './CartDetails';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment, selectProducts } from './ProductsSlice';
import SuccessComponent from './SuccessComponent';
import axios from 'axios';
const dateConverter = (date) => {
    return moment(date).format('MM/YY');
}
export default function PaymentPage() {
    const [agreementForm, setAgreementForm] = useState(false);
    useEffect(() => {
        axios.get("https://6249a1e8fd7e30c51c042ccb.mockapi.io/api/payment").then(res => {
            setAgreementForm(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const {cart, totalAmount} = useSelector(selectProducts);
    const dispatch = useDispatch();
    const monthFormat = 'YYYY/MM';
    const onFinish = (values) => {
       // first get the packageIds from the cart
       const packageIds = cart.map(item => String(item.id));
       // then remove the dashes from the cardNumber input
       const cardValues = values.cardNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
       // finally dispatch the payment action
       dispatch(makePayment({packageIds, ...values, totalAmount:totalAmount, cardNumber:cardValues, expireDate:dateConverter(values.expireDate._i)}));
      };
    return (
        <Row gutter={[0,10]} type="flex" justify="center" align="top" className="main-container">
            <Col className="common-container" xs={24} md={11} lg={13}>
                <Col span={24}>
                    <h3>Kart Bilgileri</h3>
                </Col>
                <Col span={24}>
                    <Form style={{padding:'0.5rem 1rem', gap:'0rem', borderRadius:'5px', border:'1px solid gray'}}
                        validateStatus={null}
                        colon={false}
                        layout="vertical"
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        >
                        <Col lg={10}>
                            <Form.Item
                                style={{ marginBottom: "0px" }}
                                label="Kart Üzerindeki İsim Soyisim"                       
                                name="cardHolderName"
                                rules={[{required: true, message: 'Please input your Username!',}]}>
                                <Input placeholder='name-surname' />
                            </Form.Item>
                        </Col>
                        <Row type="flex" justify="start" align="middle" className="card-inputs" wrap="true">
                            <Col lg={10}>
                                <Form.Item
                                    style={{ marginBottom: "0px" }}
                                    label="Kart Numarası"                       
                                    name="cardNumber"
                                    rules={[{required: true, message: 'Lütfen Geçerli Bir Kart Numarası Giriniz!',}]}>
                                    <Cleave
                                        className="ant-input"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        options={{delimiter:'-', blocks: [4, 4, 4, 4] }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col lg={6}> 
                                <Form.Item
                                    style={{ marginBottom: "0px" }}
                                    label="Son Kul.Tar."
                                    name="expireDate"
                                    rules={[{required: true, message: 'Lütfen Kartın Üzerindeki Son kullanma Tarihini Giriniz!'}]}>   
                                    <DatePicker
                                        defaultValue={moment('2015/01', monthFormat)}
                                        format={monthFormat}
                                        picker="month"/>
                                </Form.Item>
                            </Col>
                            <Col lg={6}>
                                <Form.Item
                                    style={{ marginBottom: "0px" }}
                                    label="CVV/CVC"
                                    name="cvv"
                                    rules={[{required: true, message: 'Lütfen Kartın Üzerindeki 3 Haneli Güvenlik Kodunu Giriniz!'}]}  >
                                    <Input.Password
                                        placeholder="CVV"
                                        maxLength={3}
                                        iconRender={(visible) => visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col lg={6}>
                            <Form.Item
                                style={{margin:"0.5rem 0"}}
                            >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Ödeme Yap
                                </Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </Col>
                <Col style={{marginTop:'0.5rem'}}>
                    <h3>Sözleşme</h3>
                </Col>
                <Col style={{padding:'1rem', overflow:"scroll", maxHeight:'30vh', borderRadius:'5px', border:'1px solid gray'}}>
                    {agreementForm}
                </Col>
            </Col>
            <Col className="common-container" xs={24} md={10} lg={5}>
                <CartDetails />
            </Col>
            <SuccessComponent />
        </Row>
)}
