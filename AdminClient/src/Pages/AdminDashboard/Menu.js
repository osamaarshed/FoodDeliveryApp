import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("jwttoken")) {
      navigate("/login");
    }
  }, []);
  const [input, setInput] = useState({
    itemname: "",
    ingredients: "",
    price: "",
    inputfile: "",
  });
  // const [response, setResponse] = useState();

  const ChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);

    setInput((values) => ({ ...values, [name]: value }));
  };
  const ChangeHandlerImage = (e) => {
    const name = e.target.name;
    const value = e.target.files[0];
    console.log(name, value);
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };
  const SubmitHandler = async (e) => {
    // console.log(input);
    const token = localStorage.getItem("jwttoken");
    const formdata = new FormData();
    formdata.append("inputfile", input.inputfile, input.inputfile.name);
    formdata.append("itemname", input.itemname);
    formdata.append("ingredients", input.ingredients);
    formdata.append("price", input.price);

    e.preventDefault();
    await axios
      .post("http://localhost:8080/AdminDashboard/Menu", formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert(res.data.message);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(input);
  };

  return (
    <>
      <Navbar />
      <h2 className="container text-center mt-5"> Menu </h2>
      <div className="container">
        <form onSubmit={SubmitHandler}>
          <div className="form-group">
            <label className="mb-2">Name of Item</label>
            <input
              type="text"
              className="form-control mb-2"
              id="itemname"
              name="itemname"
              placeholder="Enter Name of Item"
              value={input.itemname}
              onChange={ChangeHandler}
            />
          </div>

          <div className="form-group">
            <label className="mb-2">Ingredients</label>
            <input
              type="text"
              className="form-control mb-2"
              id="itemname"
              name="ingredients"
              onChange={ChangeHandler}
              value={input.ingredients}
              placeholder="Enter Name of Item"
            />
          </div>

          <div className="form-group">
            <label className="mb-2">Price</label>
            <input
              type="number"
              className="form-control mb-2"
              id="itemname"
              name="price"
              onChange={ChangeHandler}
              value={input.price}
              placeholder="Enter Price of Item"
            />
          </div>

          <div className="form-group">
            <label>Example file input</label> <br />
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              name="inputfile"
              // value={input.inputfile}
              onChange={ChangeHandlerImage}
            />
          </div>

          <button type="submit" className="btn btn-danger mb-2 d-flex mx-auto">
            Add to Menu
          </button>
        </form>
      </div>
    </>
  );
};

export default Menu;
