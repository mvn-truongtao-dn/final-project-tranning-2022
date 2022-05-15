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
import { Link } from "react-router-dom";
const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 20,
  },
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
  const users = useSelector((state) => state.users.value);
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
      responsive: ['lg']
    },
    {
      title: "Phone",
      dataIndex: "phone",
      responsive: ['lg']
    },
    {
      title: "Age",
      dataIndex: "age",
      responsive: ['sm']
    },
    {
      title: "TotalPrice",
      dataIndex: "totalPrice",
      responsive: ['xl']
    },
    {
      title: "Gender",
      dataIndex: "gender",
      responsive: ['sm']
    },
    {
      title: "Action",
      dataIndex: "action",
      responsive: ["md"],
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<FolderViewOutlined />}
            onClick={() => showModalDetailsUser(record)}
          >
            View
          </Button>

          <Button
            type="primary"
            onClick={() => handleUpdate(record.key, record)}
          >
            Update
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
        <Col span={4}>
          <Breadcrumb>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/users">Users</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col span={4} offset={16}>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={showModal}
            className="btn-create-user"
          >
            Create
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Button type="link" className="btn-margin" onClick={handleGetAllUser}>
            All
          </Button>
        </Col>
        <Col span={4} offset={16}>
          <Button
            type="primary"
            onClick={showModalFilter}
            icon={<SearchOutlined />}
            className="btn-margin btn-create-user"
          >
            Filter
          </Button>
        </Col>
      </Row>

      <Modal
        visible={isModalFilter}
        onCancel={handleCancelFilter}
        title="Filter User"
        footer={null}
      >
        <Form onFinish={onFinish} {...layout} form={form}>
          <Form.Item label="FirstName" name="Firstname">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Lastname" name="Lastname">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Phone" name="Phone">
            <Input></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
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
      </Modal>
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
