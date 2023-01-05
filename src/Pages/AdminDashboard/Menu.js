import axios from "axios";
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";

const Menu = () => {
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
  const SubmitHandler = async (e) => {
    const payload = {
      itemname: input.itemname,
      ingredients: input.ingredients,
      price: input.price,
      inputfile: input.inputfile,
    };
    e.preventDefault();
    await axios
      .post("http://localhost:8080/AdminDashboard/Menu", payload)
      .then((res) => {
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
            <label className="mb-2" for="e">
              Name of Item
            </label>
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
            <label className="mb-2" for="e">
              Ingredients
            </label>
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
            <label className="mb-2" for="e">
              Price
            </label>
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
            <label for="e">Example file input</label> <br />
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              name="inputfile"
              value={input.inputfile}
              onChange={ChangeHandler}
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
