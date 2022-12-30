import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [data, setData] = useState("");
  const getData = async () => {
    const response = await axios.get("http://localhost:8080/login/test");
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(data, "data");
  return <div>{data}</div>;
};

export default Test;
