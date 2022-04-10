import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import {selectProducts} from './ProductsSlice';
import {CheckCircleOutlined } from '@ant-design/icons';

export default function SuccessComponent ()  {
  const {paymentBool} = useSelector(selectProducts);
  useEffect(() => {
  }, [paymentBool]);

  const [visible, setVisible] = useState(paymentBool);
  return (
    <>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div style={{flexDirection:"column", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <CheckCircleOutlined style={{margin:"auto",fontSize:"150px", color:"green"}} />
          <h1>Başarıyla Tamamlandı!</h1>
        </div>
      </Modal>
    </>
  );
};
