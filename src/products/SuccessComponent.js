import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import {selectProducts} from './ProductsSlice';
import {CheckOutlined } from '@ant-design/icons';
export default function SuccessComponent ()  {
  const {paymentBool} = useSelector(selectProducts);
  useEffect(() => {
  }, [paymentBool]);

  const [visible, setVisible] = useState(paymentBool);
  return (
    <>
      <Modal
        title="Ödeme Başarılı"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <div style={{display:"flex", alignItems:"cente", justifyContent:"center"}}>
          <CheckOutlined style={{margin:"auto",fontSize:"50px", color:"green"}} />
        </div>
      </Modal>
    </>
  );
};
