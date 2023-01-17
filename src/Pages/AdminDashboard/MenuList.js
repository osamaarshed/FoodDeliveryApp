import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./../../Css/MenuList.css";
import { useNavigate, Link } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

const MenuList = () => {
  const navigate = useNavigate();
  const [menudata, setMenuData] = useState();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("jwttoken")) {
      navigate("/login");
    }
    fetchmenu();
  }, []);
  const fetchmenu = () => {
    axios.get("http://localhost:8080/AdminDashboard/MenuList").then((res) => {
      setMenuData(res.data);
    });
  };
  const handleClose = () => setShow(false);
  const editMenu = () => {
    setShow(true);
  };
  const deleteMenu = async (id) => {
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
                    {/* <td>{item.inputfile}</td> */}
                    <td>
                      <div>
                        <img
                          className="img-fluid menulist-img"
                          src={`http://localhost:8080/public/images/${item.inputfile}`}
                          alt="menuimg"
                        />
                      </div>
                    </td>
                    <td>
                      <Link className="notDisabled text-white mx-2">
                        <AiTwotoneEdit
                          onClick={() => {
                            editMenu();
                          }}
                        />
                      </Link>
                      <Link className="notDisabled text-white">
                        <AiTwotoneDelete
                          onClick={() => {
                            deleteMenu(item._id);
                          }}
                        />
                      </Link>

                      {/* //Model */}
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Menu</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Item Name Reset:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Item Name"
                              value={item.itemname}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Ingredients Reset:</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Ingredients"
                              value={item.ingredients}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                              type="number"
                              placeholder="Price"
                              value={item.price}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>Picture:</Form.Label>
                            <Form.Control
                              type="file"
                              placeholder="Picture"
                              value={item.inputfile}
                            />
                          </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button variant="primary" onClick={handleClose}>
                            Save Changes
                          </Button>
                        </Modal.Footer>
                      </Modal>
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
