import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
} from "mdb-react-ui-kit";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userAction";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setMessage("All fields are mandatory");
      return;
    }

    if (
      pic ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      setPicMessage("Please Select an Image");
      return;
    }
    setPicMessage(null);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = (pics) => {
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
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };
  return (
    <MainScreen title="Register">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabsContent>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
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
              Sign up
            </Button>
            <span className="text-center">
              Already a member?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </span>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </MainScreen>
  );
};

export default RegisterScreen;
