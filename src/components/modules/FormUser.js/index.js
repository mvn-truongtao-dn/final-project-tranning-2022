import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, notification } from "antd";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { postUser, updateUser } from "../../../store/userSlice";
import { apiUserPost, apiUserUpdate } from "../../../api/user/user.api";
import Modal from "antd/lib/modal/Modal";
import { SmileOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 20,
  },
};
const prefixSelector = (
  <Form.Item name={["user", "prefix"]} noStyle>
    <Select
      style={{
        width: 70,
      }}
      defaultValue="84"
    >
      <Option value="84">+84</Option>
    </Select>
  </Form.Item>
);

// const validateMessages = {
//   required: "${label} is required!",
//   types: {
//     email: "${label} is not a valid email!",
//     number: "${label} is not a valid number!",
//   },
//   number: {
//     range: "${label} must be between ${min} and ${max}",
//   },
// };
export default function FormUser(props) {
  const users = useSelector((state) => state.users.value);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const {
    first_name,
    last_name,
    address,
    age,
    medicine,
    phone,
    result,
    totalPrice,
    key,
    gender,
  } = props.data;
  console.log(props.data);
  useEffect(() => {
    form.setFieldsValue({
      user: {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        medicine: medicine,
        result: result,
        totalprice: totalPrice,
        age: age,
        address: address,
        gender: gender,
      },
    });
  });

  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(values);
    console.log(props.data);
    setVisible(true);
    console.log(users);
    console.log(key);
    const index = users.findIndex((object) => object.id === parseFloat(key));
    console.log(`submit ${index}`);
    const dataChange = {
      Firstname: values.user.first_name,
      Lastname: values.user.last_name,
      Phone: values.user.phone,
      Result: values.user.result,
      Address: values.user.address,
      TotalPrice: values.user.totalprice,
      Medicine: values.user.medicine,
      Age: values.user.age,
      Gender: values.user.gender,
    };

    props.handleCancel();
    setData(dataChange);
  };
  const hideModal = () => {
    const index = users.findIndex((object) => object.id === key);
    console.log(`hidemodal${index}`);
    if (index !== -1) {
      apiUserUpdate(key, data);
      dispatch(updateUser({ key, data }));
      notification.open({
        message: "Success Updated",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    } else {
      apiUserPost(data);
      const id_new = parseInt(users[users.length - 1].id) + 1;
      dispatch(postUser({ id_new, data }));
      notification.open({
        message: "Success Created",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
    }
    setVisible(false);
  };
  console.log(users);
  const hideModal1 = () => {
    setVisible(false);
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name={["user", "first_name"]}
        label="First Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "last_name"]}
        label="Last Name"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "address"]}
        label="Address"
        rules={[
          {
            // required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "phone"]}
        label="Phone Number"
        rules={[
          {
            // required: true,
            // message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={["user", "result"]} label="Result">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={["user", "gender"]} label="Gender">
        <Select
          style={{
            width: 100,
          }}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item name={["user", "medicine"]} label="Medicine">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        name={["user", "totalprice"]}
        label="TotalPrice"
        rules={[
          {
            type: "number",
            // required: true,
            // message: "Please input your price!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Modal
          visible={visible}
          onOk={hideModal}
          onCancel={hideModal1}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>Please Cofirm!</p>
        </Modal>
      </Form.Item>
    </Form>
  );
}
