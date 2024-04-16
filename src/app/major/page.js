"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserProjectsAction,
  addProjectAction,
} from "@/store/slices/authSlice";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import Image from "next/image";

import ProjectRender from "@/components/projectrender";
import ProjectDetails from "@/components/projectdetails";

export default function page() {
  const allUserProjects = useSelector((state) => state.auth.allProjects);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  useEffect(() => {
    dispatch(getAllUserProjectsAction());
  }, [dispatch]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateProject = async () => {
    // Add your validation logic here if needed
    if (newProjectName.trim() === "") {
      // Handle error
      return;
    }
    await dispatch(addProjectAction(newProjectName));
    handleCloseModal();
  };

  return (
    <>
      <div className="row">
        <div className="col-2 d-flex flex-column align-items-center justify-content-between bg-light min-vh-100">
          <div className="justify-content-start p-5">Рабочее пространство</div>
          <div className="justify-content-end p-5">Konstantin</div>
        </div>
        <div className="col-10">
          <nav className="navbar bg-light mb-4">
            <div className="container-fluid">
              {selectedProjectId ? (
                <div>документ</div>
              ) : (
                <>
                  <a className="navbar-brand" href="#">
                    Навигация
                  </a>
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    onClick={handleOpenModal}
                  >
                    + Project
                  </button>

                  <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Новый проект
                      </Typography>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Название проекта"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                      />
                      <Button onClick={handleCreateProject} color="primary">
                        Создать
                      </Button>
                    </Box>
                  </Modal>
                </>
              )}
            </div>
          </nav>

          <div className="row">
            {selectedProjectId ? (
              <ProjectDetails projectId={selectedProjectId} />
            ) : (
              <ProjectRender
                allProjects={allUserProjects}
                onProjectClick={handleProjectClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
