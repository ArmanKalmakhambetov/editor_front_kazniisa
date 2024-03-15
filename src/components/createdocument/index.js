import React from "react";
import {
  TextField,
  Container,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
  FormControl,
  Select,
  MenuItem
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
import { addProjectAction, createDocumentAction } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";



export default function CreateDocument(id) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [documentName, setDocumentName] = useState("");
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  const [serverError, setServerError] = useState("");
  const errorFromSlice = useSelector((state) => state.auth.error);
  const [selectedViewOfAd, setSelectedViewOfAd] = useState('');

  const viewOfAd = [
    {id: 1, nameOfView: 'Пустой документ'},
    {id: 2, nameOfView: 'BEP'},
  ]

  const handleTypeChangeSelectedViewOfAd = (event) => {
    setSelectedViewOfAd(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "documentName":
        setDocumentName(value);
        break;
    }
  };

  const handleSubmit = async () => {

    if (selectedViewOfAd === "Пустой документ") {
        await dispatch(createDocumentAction(documentName, id))
    }
    // Проверка наличия всех обязательных полей перед отправкой

    if (!documentName) {
      setError("Пожалуйста, заполните обязательное поле.");
      return;
    }

    // Сброс ошибки и отправка данных
    setServerError("");
    console.log("serverErrpr after handleSubmit", serverError);
    setError("");
    // await dispatch(createDocumentAction({documentName, id}));
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
                  label="Document name"
                  name="documentName"
                  type="text"
                  value={documentName}
                  onChange={handleChange}
                  placeholder="Введите название документа"
                />

                {error && <Typography color="error">{error}</Typography>}
                {serverError && <p>{serverError}</p>}
                {success && (
                  <Typography color="primary">
                    Данные успешно отправлены.
                  </Typography>
                )}
                <br />

                <FormControl>
                  {/* <InputLabel id="typeOfView-label">Select viewOfAd</InputLabel> */}
                  <Select
                    labelId="typeOfView-label"
                    id="typeOfView"
                    value={selectedViewOfAd}
                    label="Select View"
                    onChange={handleTypeChangeSelectedViewOfAd}
                  >
                    {viewOfAd.map((item) => (
                      <MenuItem key={item.id} value={item.nameOfView}>
                        {item.nameOfView}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Создать
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
