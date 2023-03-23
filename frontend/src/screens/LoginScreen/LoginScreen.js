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
// import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userAction";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));

    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   setLoading(true);

    //   const { data } = await axios.post(
    //     "/api/users/login",
    //     {
    //       email,
    //       password,
    //     },
    //     config
    //   );
    //   console.log(data);
    //   localStorage.setItem("userInfo", JSON.stringify(data));

    //   setLoading(false);
    // } catch (error) {
    //   setLoading(false);
    //   setError(error.response.data.message);
    // }
  };

  return (
    <MainScreen title="Login">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabsContent>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading />}
          <MDBTabsPane show={true}>
            <span class="text-primary">Email</span>
            <MDBInput
              wrapperClass="mb-4"
              placeholder="Enter Email"
              id="form1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span class="text-primary">Password</span>
            <MDBInput
              wrapperClass="mb-4"
              placeholder="Enter Password"
              id="form2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              {/* <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              /> */}
              {/* <Link href="!#">Forgot password?</Link> */}
            </div>

            <Button className="mb-4 w-100" onClick={submitHandler}>
              Sign in
            </Button>
            <span className="text-center">
              Not a member?{" "}
              <Link to="/Register" style={{ textDecoration: "none" }}>
                Register
              </Link>
            </span>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </MainScreen>
  );
};

export default LoginScreen;
