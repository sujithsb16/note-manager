import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/userAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import {
  MDBContainer,
  MDBInput,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

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

    dispatch(updateProfile({ name, email, password, pic }));
  };

  return (
    <MainScreen title="Edit Profile">
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

export default ProfileScreen;
