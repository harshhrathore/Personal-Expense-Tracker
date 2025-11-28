// src/Pages/Auth/Login.js

import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import logo from "../../assets/budgetbuddy-logo.jpg"; // ✅ Correct relative path

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fontLink = document.createElement("link");
    fontLink.href = "https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap";
    fontLink.rel = "stylesheet";
    document.head.appendChild(fontLink);
  }, []);

  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setLoading(true);

    try {
      const { data } = await axios.post(loginAPI, { email, password });
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      toast.error("Something went wrong!", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#000" } },
          fpsLimit: 60,
          particles: {
            number: { value: 200, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 2 },
            links: { enable: false },
            life: {
              duration: { sync: false, value: 3 },
              count: 0,
              delay: {
                random: { enable: true, minimumValue: 0.5 },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Logo and Title */}
      <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem", position: "relative" }}>
        <img
          src={logo}
          alt="BudgetBuddy Logo"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 0 15px #ffcc00",
          }}
        />
        <h1
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#ffcc00",
            textShadow: "1px 1px 5px #ffffff50",
            marginTop: "10px",
          }}
        >
          BUDGETBUDDY
        </h1>
      </div>

      <Container className="mt-3" style={{ position: "relative", zIndex: 2 }}>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h1 className="text-center mt-4">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
            </h1>
            <h2 className="text-white text-center">Login</h2>
            <Form>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                />
              </Form.Group>

              <div className="mt-4 text-center d-flex flex-column align-items-center">
                <Link to="/forgotPassword" className="text-white lnk">
                  Forgot Password?
                </Link>

                <Button
                  type="submit"
                  className="mt-3 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Signing in…" : "Login"}
                </Button>

                <p className="mt-3" style={{ color: "#9d9494" }}>
                  Don't Have an Account?{" "}
                  <Link to="/register" className="text-white lnk">
                    Register
                  </Link>
                </p>

                <div
                  style={{
                    marginTop: "2rem",
                    color: "#ffffff",
                    fontSize: "1.9rem",
                    fontWeight: "bold",
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: "2px 2px 8px rgba(255, 255, 255, 0.3)",
                    transform: "perspective(400px) rotateX(10deg)",
                  }}
                >
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  | {currentTime}
                </div>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
