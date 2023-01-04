import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

const MenuList = () => {
  const [menudata, setMenuData] = useState();
  useEffect(() => {
    fetchmenu();
  }, []);
  const fetchmenu = () => {
    axios.get("http://localhost:8080/AdminDashboard/MenuList").then((res) => {
      setMenuData(res);
    });
  };

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h2 className="mt-5">MenuList</h2>
        <div className="mt-5">
          <table className="table table-dark">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Item Name</th>
                <th scope="col">Ingredients</th>
                <th scope="col">Price</th>
                <th scope="col">Picture</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {menudata.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">1</th>
                    <td>{item.itemname}</td>
                    <td>{item.ingredients}</td>
                    <td>{item.price}</td>
                    <td>{item.inputfile}</td>
                    <td>
                      <AiTwotoneEdit />
                      <AiTwotoneDelete />
                    </td>
                  </tr>
                );
              })}

              {/*                 
              <tr>
                <th scope="row">1</th>
                <td>{menudata.itemname}</td>
                <td>{menudata.ingredients}</td>
                <td>{menudata.price}</td>
                <td>{menudata.inputfile}</td>
                <td>
                  <AiTwotoneEdit />
                  <AiTwotoneDelete />
                </td>
              </tr> */}
              {/* <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MenuList;
