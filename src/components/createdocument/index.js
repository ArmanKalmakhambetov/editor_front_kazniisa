import React from "react";
import {
  TextField,
  Container,
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Stack,
  FormControl,
  Select,
  MenuItem,
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
import {
  addProjectAction,
  createDocumentAction,
} from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

// CreateDocument Component
export default function CreateDocument({ projectId, handleClose }) {
  const dispatch = useDispatch();
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [error, setError] = useState("");

  const documentTypes = [
    { id: "empty", name: "Пустой документ" },
    { id: "bep", name: "BEP" },
    // Add more document types here
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    // Basic validation
    if (!documentName) {
      setError("Введите название документа");
      return;
    }
    if (!documentType) {
      setError("Выберите тип документа");
      return;
    }

    // Dispatch the action to create the document
    // The createDocumentAction should be adapted to handle the document type as well

    console.log(projectId, documentName, documentType);
    await dispatch(
      
      createDocumentAction({ projectId, documentName, documentType })
    );

    // Clear the form
    setDocumentName("");
    setDocumentType("");
    setError("");

    // Close the modal
    handleClose();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="documentName"
        label="Название документа"
        name="documentName"
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        autoFocus
      />
      <FormControl fullWidth margin="normal">
        <Select
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>Выберите тип документа</em>
          </MenuItem>
          {documentTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Создать
      </Button>
    </Box>
  );
}
