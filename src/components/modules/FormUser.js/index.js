import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, notification } from "antd";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { postUser, updateUser } from "../../../store/userSlice";
import {
  apiUserDetails,
  apiUserPost,
  apiUserUpdate,
} from "../../../api/user/user.api";
import Modal from "antd/lib/modal/Modal";
import { SmileOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Upload from "antd/lib/upload/Upload";
import { set } from "lodash";

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

export default function FormUser(props) {
  const users = useSelector((state) => state.users.value);
  const [data, setData] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [medicine, setMedicine] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

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
    Avatar: "",
  });
  let navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  console.log(props.data);

  useEffect(() => {
    apiUserDetails(props.userId).then((e) => {
      console.log(e.data);
      // setUser(e.data);
      setFirstname(e.data.Firstname);
      setLastname(e.data.Lastname);
      setAddress(e.data.Address);
      setPhone(e.data.Phone);
      setGender(e.data.Gender);
      setMedicine(e.data.Medicine);
      setTotalPrice(e.data.TotalPrice);
      setResult(e.data.Result);
      setAge(e.data.Age);
      setFileList(e.data.Avatar);
      console.log(fileList);
    });
    console.log(user);
  }, []);
  console.log(fileList);
  form.setFieldsValue({
    user: {
      first_name: firstname,
      last_name: lastname,
      phone: phone,
      medicine: medicine,
      result: result,
      totalprice: totalPrice,
      age: age,
      address: address,
      gender: gender,
      avatar: fileList,
    },
  });

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log(values);
    setVisible(true);
    console.log(fileList);
    console.log(values.user.avatar);
    console.log(values.user.first_name);
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
      Avatar: fileList,
    };

    console.log(dataChange);
    setData(dataChange);
    // setUser(dataChange);
  };

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
    console.log(fileList);
  };
  const hideModal = () => {

    const index = users.findIndex((object) => object.id === props.userId);
    console.log(`hidemodal${index}`);
    if (index !== -1) {
      apiUserUpdate(props.userId, data);
      dispatch(updateUser({ id: props.userId, data }));
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
    navigate("/users", { replace: true });
    setVisible(false);
  };
  const handleChange = (e) => {
    console.log(e.target.value);
  };

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
        <Input onChange={(e) => setFirstname(e.target.value)} />
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
        <Input onChange={(e) => setLastname(e.target.value)} />
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
        <Input onChange={(e) => setAddress(e.target.value)} />
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
          onChange={(e) => setPhone(e.target.value)}
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
        <InputNumber onChange={(value) => setAge(value)} />
      </Form.Item>
      <Form.Item name={["user", "result"]} label="Result">
        <Input.TextArea onChange={(e) => setResult(e.target.value)} />
      </Form.Item>
      <Form.Item name={["user", "gender"]} label="Gender">
        <Select
          style={{
            width: 100,
          }}
          defaultValue="male"
          onChange={(value) => setGender(value)}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item name={["user", "medicine"]} label="Medicine">
        <Input.TextArea onChange={(e) => setMedicine(e.target.value)} />
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
        <InputNumber onChange={(value) => setTotalPrice(value)} />
      </Form.Item>

      <Form.Item name={["user", "avatar"]} label="Avatar">
        <Upload
          listType="picture-card"
          fileList={fileList}
          // onPreview={handlePreview}
          onChange={handleUpload}
          beforeUpload={() => false}
        >
          <Button>Upload</Button>
        </Upload>
        {/* <Button
          onClick={handleSubmitUpload} // this button click will trigger the manual upload
        >
          Submit
        </Button> */}

        {/* <Modal visible={previewVisible} footer={null}>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal> */}
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
