import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Stack,
} from "react-bootstrap";
import ModalLogin from "./ModalLogin";
import UserProfile from "../assets/image/BlankProfile.jpg";
import Logo from "../assets/image/LogoDumbflix.png";
import Clip from "../assets/image/Clip.png";
import Transaction from "../assets/image/Transaction.png";
import Admin from "../assets/image/Admin.png";
import User from "../assets/image/IconUser.png";
import Pay from "../assets/image/Pay.png";
import Logout from "../assets/image/Logout.png";
import ModalRegister from "./ModalRegister";
import { UserContext } from "../context/userContext";
import { API, setAuthToken } from "../config/api";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import "../index.css";

export default function Header() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get(`/profiles`);
    return response.data.data;
  });

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleShowLogin = () => {
    handleClose(true);
    setShowLogin(true);
  };

  const handleShowRegister = () => {
    handleClose(true);
    setShowRegister(true);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };

  function homeHandler() {
    navigate("/");
  }

  function homeLogoHandler() {
    navigate("/");
    window.location.reload();
  }

  function tvHandler(e) {
    e.preventDefault();
    navigate("/tvshows");
  }

  function moviesHandler(e) {
    e.preventDefault();
    navigate("/movies");
  }

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#1F1F1F" }}
        className="fixed-top"
        expand="lg"
      >
        <Container>
          <Navbar.Collapse>
            {state.isLogin === true ? (
              state.user.is_admin === true ? (
                <>
                  <Nav className="justify-content-center">
                    <img src={Logo} width="100px" alt="Logo" />
                  </Nav>
                  <Nav className="ms-auto gap-3">
                    <NavDropdown
                      menuVariant="dark"
                      align="end"
                      title={
                        <img src={Admin} width="30px" height="30px" alt="" />
                      }
                    >
                      <NavDropdown.Item href="/addmovies">
                        <img
                          src={Clip}
                          width="20px"
                          height="20px"
                          alt="Clip"
                        ></img>
                        <span className="ms-2 text-light fw-semibold">
                          Add Film
                        </span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/addcategory">
                        <img
                          src={Clip}
                          width="20px"
                          height="20px"
                          alt="Clip"
                        ></img>
                        <span className="ms-2 text-light fw-semibold">
                          Add Category
                        </span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/tabletransaction">
                        <img
                          src={Transaction}
                          width="20px"
                          height="20px"
                          alt="Clip"
                        ></img>
                        <span className="ms-2 text-light fw-semibold">
                          Income Transaction
                        </span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logout}>
                        <img
                          src={Logout}
                          width="20px"
                          height="20px"
                          alt="Logout"
                        ></img>
                        <span className="ms-2 text-light fw-semibold">
                          Logout
                        </span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              ) : (
                <>
                  <Nav>
                    <Nav.Link onClick={homeHandler} className="text-light">
                      Home
                    </Nav.Link>
                    <Nav.Link onClick={tvHandler} className="text-light">
                      TV Shows
                    </Nav.Link>
                    <Nav.Link onClick={moviesHandler} className="text-light">
                      Movies
                    </Nav.Link>
                  </Nav>
                  <Nav className="justify-content-center">
                    <img
                      type="submit"
                      src={Logo}
                      onClick={homeLogoHandler}
                      style={{ marginLeft: "400px" }}
                      width="100px"
                      alt="Logo"
                    />
                  </Nav>
                  <Nav className="ms-auto">
                    <NavDropdown
                      menuVariant="dark"
                      align="end"
                      title={
                        <img
                          src={profile?.photo ? profile.photo : UserProfile}
                          className="rounded-circle"
                          style={{ objectFit: "cover" }}
                          width="40px"
                          height="40px"
                          alt="Profile"
                        />
                      }
                    >
                      <NavDropdown.Item href="/profile">
                        <img src={User} width="20px" height="20px" alt=""></img>
                        <span className="ms-2 text-light fw-semibold">
                          Profile
                        </span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/payment">
                        <img src={Pay} width="20px" height="20px" alt=""></img>
                        <span className="ms-2 text-light fw-semibold">Pay</span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logout}>
                        <img
                          src={Logout}
                          width="20px"
                          height="20px"
                          alt=""
                        ></img>
                        <span className="ms-2 text-light fw-semibold">
                          Logout
                        </span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              )
            ) : (
              <>
                <Nav className="pt-2 pb-2" style={{ marginLeft: "-5px" }}>
                  <Nav.Link onClick={homeHandler} className="text-light">
                    Home
                  </Nav.Link>
                  <Nav.Link onClick={tvHandler} className="text-light">
                    TV Shows
                  </Nav.Link>
                  <Nav.Link onClick={moviesHandler} className="text-light">
                    Movies
                  </Nav.Link>
                </Nav>
                <Nav className="justify-content-center">
                  <img
                    type="submit"
                    src={Logo}
                    onClick={homeLogoHandler}
                    style={{ marginLeft: "380px" }}
                    width="100px"
                    alt="Logo"
                  />
                </Nav>
                <Nav className="ms-auto">
                  <Stack direction="horizontal" gap={3}>
                    <Button
                      onClick={handleShowRegister}
                      style={{
                        backgroundColor: "white",
                        color: "#E50914",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        border: "2px solid white",
                      }}
                      size="sm"
                    >
                      Register
                    </Button>
                    <Button
                      onClick={handleShowLogin}
                      style={{
                        backgroundColor: "#E50914",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "1px",
                        paddingBottom: "1px",
                        border: "2px solid #E50914",
                      }}
                      size="sm"
                    >
                      Login
                    </Button>
                  </Stack>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin
        show={showLogin}
        onHide={handleClose}
        onClick={handleShowRegister}
      />
      <ModalRegister
        show={showRegister}
        onHide={handleClose}
        onClick={handleShowLogin}
      />
    </>
  );
}
