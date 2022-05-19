import React, { useState } from "react";
import {
  Table,
  Breadcrumb,
  Space,
  Button,
  Col,
  Row,
  Form,
  Input,
  Modal,
  notification,
  Dropdown,
  Menu,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  FolderViewOutlined,
  SearchOutlined,
  SmileOutlined,
  DownOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import FormUser from "../../../components/modules/FormUser.js";
import { deleteUser } from "../../../store/userSlice.js";
import { apiUserDelete } from "../../../api/user/user.api.js";
import useCustomSearchParams from "../../../hooks/searchParams.js";
import DetailsUser from "../../../components/modules/DetailsUser/index.js";
import { SearchParams } from "../../../core/FilterFuction.js";
import { Link, Route, Routes } from "react-router-dom";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function Users() {
  const [search, setSearch] = useCustomSearchParams();
  const [form] = Form.useForm();
  const [isModalFilter, setIsModalFilter] = useState(false);
  const [isModalDetailsUser, setIsModalDetailsUser] = useState(false);
  const [isModalDeleteUser, setIsModalDeleteUser] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    result: "",
    totalPrice: 0,
    medicine: "",
    age: 0,
    gender: "",
    address: "",
  });
  console.log(user.first_name);
  const [isModalVisible, setIsModalVisible] = useState(false);
  let users = JSON.parse(
    JSON.stringify(useSelector((state) => state.users.value))
  ).reverse();
  const showModal = () => {
    setIsModalVisible(true);
    setUser({
      first_name: "",
      last_name: "",
      phone: "",
      result: "",
      totalPrice: 0,
      medicine: "",
      age: 0,
      gender: "",
      address: "",
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleUpdate = (id, data) => {
    setIsModalVisible(true);
    setUser(data);
  };

  const handleDelete = (id, data) => {
    setIsModalDeleteUser(true);
    setUser(data);
  };
  const handleModalDeleteUser = () => {
    console.log(user);
    apiUserDelete(user.key);
    dispatch(deleteUser(user));
    notification.open({
      message: "Success Delete",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
    setIsModalDeleteUser(false);
  };
  const handleModalCancelDeleteUser = () => {
    setIsModalDeleteUser(false);
  };
  console.log(user);
  console.log(users);
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      width: 200,

      render: (text, record) => <img src={record.avatar}></img>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Address",
      dataIndex: "address",
      responsive: ["lg"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      responsive: ["lg"],
    },
    {
      title: "Age",
      dataIndex: "age",
      responsive: ["sm"],
    },
    {
      title: "TotalPrice",
      dataIndex: "totalPrice",
      responsive: ["xl"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      responsive: ["sm"],
    },
    {
      title: "Action",
      dataIndex: "action",
      responsive: ["md"],
      width: 100,
      render: (text, record) => (
        <Space size="small">
          <Button
            icon={<FolderViewOutlined />}
            onClick={() => showModalDetailsUser(record)}
          >
            View
          </Button>
          <Button type="primary">
            <Link to={`${record.key}/edit`}>Update</Link>
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key, record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      responsive: ["xs"],
      render: (text, record) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: (
                    <Button
                      icon={<FolderViewOutlined />}
                      onClick={() => showModalDetailsUser(record)}
                    >
                      View
                    </Button>
                  ),
                },
                {
                  label: (
                    <Button
                      type="primary"
                      onClick={() => handleUpdate(record.key, record)}
                    >
                      Update
                    </Button>
                  ),
                },
                {
                  label: (
                    <Button
                      type="primary"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDelete(record.key, record)}
                    >
                      Delete
                    </Button>
                  ),
                },
              ]}
            />
          }
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <EllipsisOutlined />
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];
  const data = [];
  form.setFieldsValue({
    Firstname: search.Firstname,
    Lastname: search.Lastname,
    Phone: search.Phone,
  });

  users.filter(SearchParams(search)).map((item, index) => {
    data.push({
      key: item.id,
      avatar: item.Avatar[0].thumbUrl,
      first_name: item.Firstname,
      last_name: item.Lastname,
      address: item.Address,
      age: item.Age,
      gender: item.Gender,
      totalPrice: item.TotalPrice,
      phone: item.Phone,
      result: item.Result,
      medicine: item.Medicine,
    });
  });
  const showModalFilter = () => {
    setIsModalFilter(true);
  };
  const handleCancelFilter = () => {
    setIsModalFilter(false);
  };

  const onFinish = (value) => {
    setSearch({
      Firstname: value.Firstname,
      Lastname: value.Lastname,
      Phone: value.Phone,
    });
  };
  const showModalDetailsUser = (data) => {
    setIsModalDetailsUser(true);
    setUser(data);
  };
  const handleCancelViewUser = () => {
    setIsModalDetailsUser(false);
  };
  const handleGetAllUser = (user) => {
    setSearch({ Firstname: "", Lastname: "", Phone: "" });
  };
  return (
    <div className="site-layout-background">
      <Row className="border-bottom">
        <Col span={22} xl={22} sm={21} xs={18}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <span className="title-page">Admin</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/users">
                <span className="title-page">Users</span>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={2} xs={6} sm={3} xl={2}>
          <Link to="create">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              // onClick={showModal}
              className="btn-create-user"
            >
              Create
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="row-search">
        <Col span={2} xs={24} sm={4} lg={4} xl={2}>
          <Button type="link" className="btn-margin" onClick={handleGetAllUser}>
            All
          </Button>
        </Col>
        <Col span={22} xs={24} sm={20} lg={20} xl={22}>
          <Form
            onFinish={onFinish}
            {...layout}
            form={form}
            className="form-search"
          >
            <Row>
              <Col span={7} xs={24} sm={24} lg={12} xl={8}>
                <Form.Item label="FirstName" name="Firstname">
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={7} xs={24} sm={24} lg={12} xl={7}>
                <Form.Item label="Lastname" name="Lastname">
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col span={7} xs={24} sm={24} lg={12} xl={7}>
                <Form.Item label="Phone" name="Phone" maxLength={50}>
                  <Input></Input>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} lg={12} xl={2}>
                <Form.Item wrapperCol={{offset:2}}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-search"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {/* <Col span={4} offset={16}>
        <Button
          type="primary"
          onClick={showModalFilter}
          icon={<SearchOutlined />}
          className="btn-margin btn-create-user"
        >
          Filter
        </Button>
      </Col> */}
      {/* <Modal
        visible={isModalFilter}
        onCancel={handleCancelFilter}
        title="Filter User"
        footer={null}
      > */}

      {/* </Modal> */}

      {/* <Modal
        title="Form Users"
        footer={null}
        maskClosable={false}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <FormUser
          handleCancel={handleCancel}
          handleUpdate={handleUpdate}
          showModal={showModal}
          data={user}
        />
      </Modal> */}
      <Table columns={columns} dataSource={data} />
      <Modal
        visible={isModalDetailsUser}
        onCancel={handleCancelViewUser}
        footer={null}
        width={1000}
      >
        <DetailsUser data={user} />
      </Modal>
      <Modal
        visible={isModalDeleteUser}
        onOk={handleModalDeleteUser}
        onCancel={handleModalCancelDeleteUser}
        title="Confirm"
      >
        <p>Please Cofirm!</p>
      </Modal>
    </div>
  );
}
