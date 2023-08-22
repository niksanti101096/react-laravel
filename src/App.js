import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./bootstrap/bootstrap.min.css"
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import ProductList from "./components/ProductList";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/";


function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className=" navbar-brand text-white">
            Laravel ft. React
          </Link>
          <Link to={"/create"} className=" nav-link text-white">
            Create
          </Link>
          <Link to={"/edit"} className=" nav-link text-white">
            Edit
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={"12"}>
            <Routes>
              <Route exactPath path="/" element={<ProductList />}></Route>
              <Route exactPath path="/create" element={<CreateProduct />}></Route>
              <Route exactPath path="/edit/:id" element={<EditProduct />}></Route>
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
