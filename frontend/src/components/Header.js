import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './style.css';
import logo from '../assets/budgetbuddy-logo.jpg'; // path to your logo
import { FaBars, FaHome } from "react-icons/fa";

// Load custom font

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const handleShowLogin = () => {
    navigate("/login");
  };

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
    }
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: { color: { value: '#000' } },
            fpsLimit: 60,
            particles: {
              number: { value: 200, density: { enable: true, value_area: 800 } },
              color: { value: '#ffcc00' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              links: { enable: false },
              move: { enable: true, speed: 2 },
              life: {
                duration: { sync: false, value: 3 },
                count: 0,
                delay: { random: { enable: true, minimumValue: 0.5 }, value: 1 },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{ position: 'relative', zIndex: 2, backgroundColor: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(4px)' }}>
          <Navbar.Brand href="/" className="text-white d-flex align-items-center">
            <img src={logo} alt="logo" style={{ width: 40, height: 40, marginRight: 10 }} />
            <span style={{ fontFamily: 'Times New Roman  sans-serif', fontWeight: 'bold', fontSize: '20px' }}>
              BUDGETBUDDY
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              fontSize: "1.5rem"
            }}
          >
            <FaBars />
          </Navbar.Toggle>

          <div>
            <Navbar.Collapse id="responsive-navbar-nav" style={{ color: "white" }}>
              {user ? (
                <Nav className="align-items-center gap-3">
                  <FaHome color="skyblue" size={24} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate("/")} />
                  <Button variant="primary" onClick={handleShowLogout}>Logout</Button>
                </Nav>
              ) : (
                <Nav className="align-items-center gap-3">
                  <FaHome color="skyblue" size={24} style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate("/")} />
                  <Button variant="primary" onClick={handleShowLogin}>Login</Button>
                </Nav>
              )}
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;