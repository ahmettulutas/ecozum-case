import React, {useState, useEffect} from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Cleave from 'cleave.js/react';
import moment from 'moment';
import CartDetails from './CartDetails';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment, selectProducts } from './ProductsSlice';
import SuccessComponent from './SuccessComponent';

const dateConverter = (date) => {
    return moment(date).format('MM/YY');
}
export default function PaymentPage() {
    const {cart, totalAmount} = useSelector(selectProducts);
    const dispatch = useDispatch();
    const monthFormat = 'YYYY/MM';
    const onFinish = (values) => {
       // get the packageIds from the cart
       const packageIds = cart.map(item => String(item.id));
       // remove the dashes from the cardNumber input
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
                                    rules={[{required: true, message: 'Lütfen Kartın Üzerindeki Son kullanma Tarihini Giriniz!'}]}  >
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus tortor sed felis tempus, vitae vestibulum nisl aliquam. Morbi ut arcu nisl. Phasellus vel odio blandit, euismod est vitae, auctor lectus. Nunc consectetur pellentesque lorem eget sodales. Duis pharetra dolor ut sem eleifend ultricies. Nulla egestas quam nec nisl blandit luctus nec ac nisi. Vestibulum porta venenatis scelerisque. Ut ac tristique justo. Donec in nisi in leo placerat porttitor eu ut ante. Vivamus non quam accumsan, tincidunt nunc ac, ornare risus. Duis rutrum scelerisque quam, a elementum massa condimentum ac. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis nec tempor leo, ac eleifend dui. Donec tristique quis orci non elementum. Praesent bibendum orci arcu.
                    Nulla facilisi. Phasellus accumsan, sem sed pharetra hendrerit, ipsum metus iaculis ex, vitae feugiat tortor eros in est. Etiam a sapien commodo, condimentum ipsum eget, feugiat ligula. Morbi sit amet feugiat mauris, non lacinia nisl. Sed in sem vel nisi viverra placerat. Nullam pulvinar turpis vitae pharetra malesuada. Praesent et magna pellentesque mauris vulputate sagittis. Nullam sit amet iaculis mauris. Morbi orci tortor, feugiat vel vestibulum quis, aliquet sit amet massa. Nullam eu volutpat odio. Nullam dignissim, nisl sit amet laoreet aliquet, elit magna posuere lectus, elementum suscipit purus felis ac arcu. Nulla sem lorem, fermentum in tempus sed, convallis et ipsum. Duis luctus ligula ut urna sagittis pellentesque.
                    Sed et lacinia purus. Nam nisl metus, maximus non pulvinar id, eleifend eu metus. Donec lobortis nulla libero, at ullamcorper quam euismod a. Quisque a sapien metus. Sed at lacinia erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam tempus ligula vel iaculis placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis tincidunt turpis, placerat accumsan est.
                    Nulla sagittis arcu risus, ac posuere nunc facilisis et. Cras eu orci pulvinar orci imperdiet rutrum. Fusce imperdiet cursus enim sed pulvinar. Vestibulum nec turpis leo. Vivamus non volutpat est. Donec sed suscipit elit, id molestie justo. Aenean ac accumsan mi, et iaculis elit. Nulla rutrum ex nec dui gravida ultrices. Fusce bibendum elementum tortor, nec accumsan nisl porta ac. In hac habitasse platea dictumst.
                    Vivamus facilisis pharetra neque mattis lacinia. Suspendisse lobortis blandit nisi vel scelerisque. Vestibulum molestie leo sit amet nisi vulputate tristique. Proin metus leo, blandit in fringilla id, tincidunt sit amet nisl. Proin ut dui quam. In eu cursus risus. Quisque pharetra diam id sapien dignissim luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum enim lorem, tincidunt sit amet pellentesque eget, ultricies vel ex. Phasellus luctus volutpat augue, eu rhoncus enim cursus ut. In dignissim pellentesque mauris, in aliquet metus. Vestibulum pellentesque, nibh vitae facilisis iaculis, neque mauris cursus mauris, ac mollis ligula tortor et diam. In tristique odio sed nulla pharetra, eu rhoncus libero sagittis. Vivamus non lectus vitae ipsum elementum vehicula ac quis lorem. Integer porttitor, eros sit amet ultricies semper, urna tellus semper risus, nec gravida metus felis eu sapien. Nulla ut erat gravida, ullamcorper est sit amet, vestibulum ipsum. Ut cursus, leo ut tincidunt posuere, purus arcu ullamcorper neque, vel ultricies nibh eros in leo.
                    Sed sit amet vestibulum quam. Morbi eget ultricies tellus. Ut posuere placerat odio. Donec semper viverra mi, vel accumsan lacus blandit vitae. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam id magna eu ipsum vestibulum semper a a massa. Pellentesque egestas diam non leo dignissim dictum.
                    Nulla finibus, justo vitae gravida ornare, velit magna dignissim risus, et placerat lacus nulla in elit. Nunc commodo ac massa ut feugiat. Aenean non consequat sem. Suspendisse a bibendum turpis. Vestibulum vulputate metus id ipsum blandit, at vehicula nunc consectetur. Duis consequat nunc neque, sollicitudin blandit libero ullamcorper non. Curabitur tempor id mauris eu efficitur. Nullam at enim risus. Integer porta massa purus, sed rutrum sem bibendum et. In non tristique nisl.
                    Praesent cursus nisl nisl, nec tristique metus rhoncus in. In urna magna, volutpat vel mi eget, auctor tempor justo. Integer egestas auctor porttitor. Proin vel hendrerit ex, sit amet lacinia nunc. Fusce tristique, felis non bibendum pulvinar, enim justo auctor turpis, id varius ex erat a enim. Donec lobortis dolor vel enim pretium maximus. Praesent et ante nec sapien scelerisque aliquam.
                    Curabitur nec orci blandit arcu tincidunt tempus a ac urna. Aliquam eget magna dictum, sagittis purus non, commodo quam. Vivamus venenatis dictum elit, auctor ornare purus feugiat in. Donec pellentesque porta mauris, ut vestibulum mauris consectetur non. Phasellus et rhoncus sapien, tempor efficitur massa. Suspendisse imperdiet, dui sed blandit imperdiet, magna risus aliquam libero, eu consectetur tellus ipsum id tortor. Aenean felis quam, pulvinar sed magna quis, elementum dictum dolor. Ut condimentum erat a tortor lacinia sollicitudin. Curabitur tempor, mi eget hendrerit consectetur, ante massa imperdiet quam, non aliquet nisi libero ac magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc egestas interdum volutpat. Donec venenatis mi iaculis massa aliquet pulvinar.
                </Col>
            </Col>
            <Col className="common-container" xs={24} md={10} lg={5}>
                <CartDetails />
            </Col>
            <SuccessComponent />
        </Row>
)}
