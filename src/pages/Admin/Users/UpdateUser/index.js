import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUserDetails } from "../../../../api/user/user.api";
import FormUser from "../../../../components/modules/FormUser.js";

export default function UpdateUser(props) {
  const { userId } = useParams();
  return (
    <>
      <FormUser userId={userId} />
    </>
  );
}
