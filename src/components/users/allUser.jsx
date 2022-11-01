import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { validateCreateUser } from "../../validators";
import "./users.css";

const AllUser = () => {
  let initialValue = {
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  };
  const [users, setUsers] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [payload, setPayload] = useState(initialValue);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://reqres.in/api/users`);
      setUsers(response.data.data);
    }
    fetchData();
  }, []);

  const handleUser = () => {
    setOpenPopup(!openPopup);
  };

  const handleChange = (value, name) => {
    if (name === "avatar") {
      console.log("avatar");
      const ImageUrl = window?.URL?.createObjectURL(value[0]);
      setPayload({ ...payload, [name]: ImageUrl });
    }else{
      setPayload({ ...payload, [name]: value });
    }
    console.log("avatarjj");
  };

  const handleAdd = () => {
    console.log(payload, "payloadpayload");
    const { isValid, errors } = validateCreateUser(payload);
    setErrors(errors);
    if (isValid) {
      async function addData() {
        const response = await axios.post(`https://reqres.in/api/users`, {
          payload,
        });
        let usersArray = [];
        usersArray.push(response.data.payload);
        let updatedValue = users.concat(usersArray);
        setUsers(updatedValue);
      }
      addData();
      handleUser();
    }
  };

  return (
    <div className="user-page">
      <div className="container">
        <div className="add-btn">
          <Button onClick={handleUser}>Add User</Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {console.log(users, 'fkdljldjglg')}
            {users &&
              users
              .sort((k1, k2) => k1?.first_name?.localeCompare(k2.first_name))
              .map((el, i) => (
                <tr key={i}>
                  <td>
                    <img src={el?.avatar} alt="avatar" />
                  </td>
                  <td>{i + 1}</td>
                  <td>
                    {el?.first_name} {el?.last_name}
                  </td>
                  <td>{el?.email}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <UserPopup
          show={openPopup}
          handleClose={handleUser}
          handleChange={handleChange}
          handleAdd={handleAdd}
          errors={errors}
        />
      </div>
    </div>
  );
};
export default AllUser;

const UserPopup = ({ show, handleClose, handleChange, handleAdd, errors }) => {
  console.log(errors, "fgkjjgldjfkl");
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="user-popup">
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => handleChange(e.target.value, "first_name")}
            />
            {errors && errors.first_name ? (
              <p className="error-msg">{errors.first_name}</p>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => handleChange(e.target.value, "last_name")}
            />
            {errors && errors.last_name ? (
              <p className="error-msg">{errors.last_name}</p>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => handleChange(e.target.value, "email")}
            />
            {errors && errors.email ? (
              <p className="error-msg">{errors.email}</p>
            ) : (
              ""
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <input
              type="file"
              placeholder="Upload Image"
              className="form-control"
              name="avatar"
              onChange={(e) => handleChange(e.target.files, "avatar")}
            />
          </Form.Group>
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
