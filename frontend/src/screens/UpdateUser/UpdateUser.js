import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./UpdateUser.css";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../actions/adminActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  MDBContainer,
  MDBInput,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = ({ setAdmin }) => {
  setAdmin(true);
  let { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [date, setDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userUpdate = useSelector((state) => state.adminUserUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/admin/${id}`);
      setName(data.name);
      setEmail(data.email);
      setPic(data.pic);
      setIsAdmin(data.isAdmin);
      setDate(data.updatedAt);
    };
    fetching();
  }, [date, id, navigate, loading, error, success]);

  const postDetails = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notemaker");
      data.append("cloud_name", "dh7awu1h4");
      fetch("https://api.cloudinary.com/v1_1/dh7awu1h4/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateUserAction({ id, name, email, password, pic, isAdmin }));
  };

  return (
    <MainScreen title={`Update ${name}`}>
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
              <MDBTabsContent>
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <MDBTabsPane show={true}>
                  <span class="text-primary">Username</span>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Enter Username"
                    id="username"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <span class="text-primary">Email</span>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Enter Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span class="text-primary">Password</span>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Enter Password"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span class="text-primary">Confirm Password</span>
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span class="text-primary">Upload Profile Picture</span>
                  <MDBInput
                    wrapperClass="mb-4"
                    id="profile"
                    type="file"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                  <span class="text-primary">Role</span>
                  <Form.Select
                    className="mb-4"
                    label="Default select example"
                    onChange={(e) => {
                      setIsAdmin(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    <option hidden>{isAdmin ? "Admin" : "User"}</option>
                    <option value={true}>Admin</option>
                    <option value={false}>User</option>
                  </Form.Select>
                  {picMessage && (
                    <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                  )}

                  <Button className="mb-4 w-100" onClick={submitHandler}>
                    Update
                  </Button>
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBContainer>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default UpdateUser;
