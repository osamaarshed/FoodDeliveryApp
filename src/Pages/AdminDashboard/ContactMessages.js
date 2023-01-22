import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";

const ContactMessages = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwttoken")) {
      //   navigate("/login");
      navigate("/login");
    }
    fetchMessages();
  }, []);
  const fetchMessages = () => {
    axios
      .get("http://localhost:8080/AdminDashboard/Contact")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h2 className="mt-5">Contact Messages List</h2>
        <div className="mt-5">
          <table className="table table-dark ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Subject</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
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

export default ContactMessages;
