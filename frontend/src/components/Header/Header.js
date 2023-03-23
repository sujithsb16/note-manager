import React, { useEffect } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../../features/users/userLoginSlice";

const Header = ({ setSearch, setUserSearch, setAdmin, admin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const set = userInfo ? (userInfo.isAdmin ? setAdmin(true) : null) : null;

  useEffect(() => {}, [userInfo]);

  const logoutHandler = () => {
    setAdmin(false);
    dispatch(userLogout());
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          {admin ? (
            <Link
              to="/admin"
              style={{ color: "white", textDecoration: "none" }}
            >
              Note Maker | Admin
            </Link>
          ) : (
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Note Maker
            </Link>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {userInfo ? (
          <Navbar.Collapse id="navbarScroll">
            {userInfo && !admin ? (
              <>
                <Nav
                  className="m-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link>
                    <Link
                      to="mynotes"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      My Notes
                    </Link>
                  </Nav.Link>
                  <NavDropdown
                    title={userInfo.name}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item>
                      <Link
                        className="text-black"
                        to="profile"
                        style={{ textDecoration: "none" }}
                      >
                        My Profile
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form>
              </>
            ) : (
              <>
                <Nav
                  className="m-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link>
                    <Link
                      to="mynotes"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      My Notes
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to="admin"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Dashboard
                    </Link>
                  </Nav.Link>
                  <NavDropdown
                    title={userInfo.name}
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item>
                      <Link
                        className="text-black"
                        to="profile"
                        style={{ textDecoration: "none" }}
                      >
                        My Profile
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      onClick={() => {
                        logoutHandler();
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setUserSearch(e.target.value)}
                  />
                </Form>
              </>
            )}
          </Navbar.Collapse>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default Header;
