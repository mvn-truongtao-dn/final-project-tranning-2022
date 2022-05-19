import React from "react";
import { Column } from "@ant-design/plots";
import { Breadcrumb, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import a, { groupBy } from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const users = JSON.parse(
    JSON.stringify(useSelector((state) => state.users.value))
  ); //get ra mot ban moi //
  const DataFormatDate = [];
  users.map((item) => {
    item.createdAt = moment(item.createdAt).format("MMMM Do YYYY");
    DataFormatDate.push(item);
  });
  const grouped = a.groupBy(DataFormatDate, "createdAt");
  const ketqua = a.mapValues(grouped, (o) => {
    return o.reduce((prev, current) => prev + current.TotalPrice, 0);
  });
  console.log(ketqua);
  const value = Object.values(ketqua);
  const key = Object.keys(ketqua);
  console.log(value);
  console.log(key);
  const data = [];
  value.map((item, index) => {
    data.push({
      type: key[index],
      sales: item,
    });
  });
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "Doanh Thu",
      },
    },
  };

  return (
    <div className="site-layout-background">
      <Row className="border-bottom">
        <Col span="24">
          <Breadcrumb>
            <Breadcrumb.Item>
              <span className="title-page">Admin</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="">
                <span className="title-page">Dashboard</span>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>

      <Column
        {...config}
        className="chart-custom"
        className="dashboard-turnover"
      />
    </div>
  );
}
