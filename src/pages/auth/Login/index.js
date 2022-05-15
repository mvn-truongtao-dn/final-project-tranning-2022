import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import userAuth from "../../../hooks/userAuth";
import { getUserLogin, getValueUser } from "../../../store/userLoginSlice";

export default function Login() {
  const { login } = userAuth();
  const user = localStorage.getItem("user");
  console.log(user);
  if (user) {
    return <Navigate to="/" replace />;
  }
  const onFinish = (values) => {
    login(values.email,values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container-center">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-login"
      >
        <h1 className="title-page">Login</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 5 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
