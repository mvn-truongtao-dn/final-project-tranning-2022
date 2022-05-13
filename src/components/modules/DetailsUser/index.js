import { Col, Row } from "antd";
import React from "react";

export default function DetailsUser(props) {
  console.log(props.data);
  const {
    first_name,
    last_name,
    age,
    address,
    medicine,
    result,
    gender,
    phone,
    totalPrice,
  } = props.data;
  return (
    <Row>
      <Col span={12}>
        <div>
          <h3 className="title-user">
            FirstName: <span className="info-user">{first_name}</span>
          </h3>
          <h3 className="title-user">
            LastName: <span className="info-user">{last_name}</span>
          </h3>
          <h3 className="title-user">
            Age: <span className="info-user">{age}</span>
          </h3>
          <h3 className="title-user">
            Gender: <span className="info-user">{gender}</span>
          </h3>
          <h3 className="title-user">
            Phone: <span className="info-user">{phone}</span>
          </h3>
          <h3 className="title-user">
            Address: <span className="info-user">{address}</span>
          </h3>
          <h3 className="title-user">
            TotalPrice: <span className="info-user">{totalPrice} $</span>{" "}
          </h3>
        </div>
      </Col>
      <Col span={12}>
        <h1 className="title-info">Medical record information</h1>
        <div className="content-info-user">
          <div className="info-result">
            <h5 className="title-name">Result:</h5>
            <p className="">{result}</p>
          </div>
          <div className="info-medicine">
            <h5 className="title-name">Medicine:</h5>
            <p>{medicine}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}
