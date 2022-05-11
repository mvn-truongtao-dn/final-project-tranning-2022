import React, { useState } from "react";
import { Table, Breadcrumb, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import FormUser from "../../../components/modules/FormUser.js";
import Modal from "antd/lib/modal/Modal";
import { deleteUser } from "../../../store/userSlice.js";
import { apiUserDelete } from "../../../api/user/user.api.js";

export default function Users() {
  const dispatch = useDispatch()
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
  const handleDelete = (id,data) => {
    apiUserDelete(id);
    dispatch(deleteUser(data));
  };
  console.log(user);
  console.log(users);
  const columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "TotalPrice",
      dataIndex: "totalPrice",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleUpdate(record.key, record)}
          >
            Update
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record.key, record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const data = [];
  users.map((item, index) => {
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
  return (
    <div className="site-layout-background">
      <Breadcrumb>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Users</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Button type="primary" onClick={showModal}>
        Create
      </Button>
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
    </div>
  );
}
