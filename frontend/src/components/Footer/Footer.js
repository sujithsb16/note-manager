import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        position: "relative",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#5396ed",
      }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3 text-light">
            Copyright &copy; Note Maker
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
