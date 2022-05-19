import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, notification } from "antd";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { postUser, updateUser } from "../../store/userSlice";
import {
  apiUserDetails,
  apiUserPost,
  apiUserUpdate,
} from "../../api/user/user.api";
import Modal from "antd/lib/modal/Modal";
import { SmileOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
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

export default function UpdateUser(props) {
  const { userId } = useParams();
  const users = useSelector((state) => state.users.value);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    Phone: "",
    Result: "",
    TotalPrice: 0,
    Medicine: "",
    Age: 0,
    Gender: "",
    Address: "",
  });

  useEffect(() => {
    apiUserDetails(userId).then((e) => {
      console.log(e.data);
      setUser(e.data);
    });
    console.log(userId);
  }, []);
  form.setFieldsValue({
    user: {
      first_name: user.Firstname,
      last_name: user.Lastname,
      phone: user.Phone,
      medicine: user.Medecine,
      result: user.Result,
      totalprice: user.TotalPrice,
      age: user.Age,
      address: user.Address,
      gender: user.Gender,
    },
  });
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // console.log(values);
    // console.log(props.data);
    // setVisible(true);
    // console.log(users);
    // console.log(key);
    // const index = users.findIndex((object) => object.id === parseFloat(key));
    // console.log(`submit ${index}`);
    // const dataChange = {
    //   Firstname: values.user.first_name,
    //   Lastname: values.user.last_name,
    //   Phone: values.user.phone,
    //   Result: values.user.result,
    //   Address: values.user.address,
    //   TotalPrice: values.user.totalprice,
    //   Medicine: values.user.medicine,
    //   Age: values.user.age,
    //   Gender: values.user.gender,
    // };
    // props.handleCancel();
    // setData(dataChange);
  };
  const hideModal = () => {
    // const index = users.findIndex((object) => object.id === key);
    // console.log(`hidemodal${index}`);
    // if (index !== -1) {
    //   apiUserUpdate(key, data);
    //   dispatch(updateUser({ key, data }));
    //   notification.open({
    //     message: "Success Updated",
    //     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    //   });
    // } else {
    //   apiUserPost(data);
    //   const id_new = parseInt(users[users.length - 1].id) + 1;
    //   dispatch(postUser({ id_new, data }));
    //   notification.open({
    //     message: "Success Created",
    //     icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    //   });
    // }
    // setVisible(false);
  };
  console.log(users);
  const hideModal1 = () => {
    setVisible(false);
  };
  return (
    <Form {...layout} name="nest-messages" form={form} onFinish={onFinish}>
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
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
