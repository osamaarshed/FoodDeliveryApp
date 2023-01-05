import React, { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

const MenuList = () => {
  const [menudata, setMenuData] = useState();
  // const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    // const id = searchParams.get("id");
    fetchmenu();
    // deleteMenu(id);
  }, []);
  const fetchmenu = () => {
    axios.get("http://localhost:8080/AdminDashboard/MenuList").then((res) => {
      setMenuData(res.data);
    });
  };
  const deleteMenu = async (id, e) => {
    // e.preventDefault();
    // let params = setSearchParams.get(e.target);

    await axios
      .delete(`http://localhost:8080/AdminDashboard/MenuList${id}`)
      .then((res) => {
        console.log(res.data);
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
              {menudata?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.itemname}</td>
                    <td>{item.ingredients}</td>
                    <td>{item.price}</td>
                    <td>{item.inputfile}</td>
                    <td>
                      <AiTwotoneEdit />
                      <AiTwotoneDelete
                        onClick={() => {
                          deleteMenu(item._id);
                        }}
                      />
                    </td>
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

export default MenuList;
