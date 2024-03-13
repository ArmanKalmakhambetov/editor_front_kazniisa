import React from "react";
import {
  TextField,
  Container,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Form,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
} from "reactstrap";

export default function AddProject() {
  const dispatch = useDispatch();

  const [projectName, setProjectName] = useState("");
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [serverError, setServerError] = useState("");
  const errorFromSlice = useSelector((state) => state.auth.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "projectName":
        setProjectName(value);
        break;
    }
  };

  const handleSubmit = async () => {
    // Проверка наличия всех обязательных полей перед отправкой

    if (!projectName) {
      setError("Пожалуйста, заполните обязательное поле.");
      return;
    }

    // Сброс ошибки и отправка данных
    setServerError("");
    console.log("serverErrpr after handleSubmit", serverError);
    setError("");
    // await dispatch(addCompanyAction(projectName));
    setSuccess(true);
  };

  return (
    <div className="flexColumn">
      <Row
        style={{
          height: "98vh",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <Col className="" sm="4" xs="6"></Col>
        <Col sm="4" xs="6">
          <Row className="card">
            <Col>
              <form action="" method="POST">
                <Input
                  label="Project name"
                  name="projectName"
                  type="text"
                  value={projectName}
                  onChange={handleChange}
                  placeholder="Введите название проекта"
                />

                {error && <Typography color="error">{error}</Typography>}
                {serverError && <p>{serverError}</p>}
                {success && (
                  <Typography color="primary">
                    Данные успешно отправлены.
                  </Typography>
                )}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Сохранить
                </Button>
              </form>
            </Col>
          </Row>
        </Col>
        <Col className="" sm="4"></Col>
      </Row>
    </div>
  );
}
