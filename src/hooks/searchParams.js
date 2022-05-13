import React from "react";
import { useSearchParams } from "react-router-dom";

export default function useCustomSearchParams() {
  const [search, setSearch] = useSearchParams({
    Firstname: "",
    Lastname: "",
    Phone: "",
  });
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));// chuyen params thanh 1 object
  return [searchAsObject, setSearch];
}
