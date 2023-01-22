import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {
  const [apidata, setApiData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwttoken")) {
      //   navigate("/login");
      navigate("/login");
    }
    fetchOrders();
  }, []);
  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/AdminDashboard/MyOrders")
      .then((response) => {
        console.log(response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h2 className="mt-5">Orders List</h2>
        <div className="mt-5">
          <table className="table table-dark ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">OrderId:</th>
                <th scope="col">ProductId:</th>
                <th scope="col">Product Name:</th>
                <th scope="col">Price:</th>
                <th scope="col">Quantity:</th>
              </tr>
            </thead>
            <tbody>
              {apidata?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item._id}</td>
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>{item.productPrice}</td>
                    <td>{item.productQuantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
