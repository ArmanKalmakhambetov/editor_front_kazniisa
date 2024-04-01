"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectDocumentsAction,
  getAllUserProjectsAction,
} from "@/store/slices/authSlice";
import Document from "@/components/document";

export default function Home() {
  const [currentId, setCurrentId] = useState(null);

  const [showDoc, setShowDoc] = useState(false);
  const allUserProjects = useSelector((state) => state.auth.allProjects);
  const allProjectDocuments = useSelector((state) => state.auth.allDocuments);
  const dispatch = useDispatch();
  const arr = [];

  allProjectDocuments.map((item) => {
    arr.push(item.id);
  });

  const [currentDoc, setCurrentDoc] = useState(arr[0]);

  console.log("1. currentDoc=", currentDoc);
  useEffect(() => {
    dispatch(getAllUserProjectsAction()).catch((error) =>
      console.error("Error fetching user projects:", error)
    );
    setTimeout(3000);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProjectDocumentsAction(currentId)).catch((error) =>
      console.error("Error fetching project documents:", error)
    );
    setTimeout(3000);
  }, [dispatch]);

  const handlePassId = (id) => {
    dispatch(getAllProjectDocumentsAction(id))
    setCurrentDoc(arr[0]);
    setCurrentId(id);
  };

  const handleDocId = (id) => {
    setCurrentDoc(id);
    setShowDoc(true);
  };

  return (
    <div className="home">
      <div className="home__box">
        <div className="home__layout">layout</div>
        <div className="home__right">
          <div className="home__nav">
            {allProjectDocuments.map((item) => (
              <button key={item.id} onClick={() => handleDocId(item.id)}>
                {item.document_name}
              </button>
            ))}
          </div>
          <button className="create__btn">+</button>
          {currentId ? (
            showDoc ? (
              <>askldaslkd</>
            ) : (
              <Document id={currentDoc} />
            )
          ) : (
            <Projects handlePassId={handlePassId} />
          )}
        </div>
      </div>
    </div>
  );
}

const Projects = ({ handlePassId }) => {
  const projects = useSelector((state) => state.auth.allProjects);

  return (
    <>
      {projects && projects.length > 0 ? (
        projects.map((item) => (
          <div key={item.id}>
            <button onClick={() => handlePassId(item.id)}>
              {item.project_name}
            </button>
          </div>
        ))
      ) : (
        <h1>no data</h1>
      )}
    </>
  );
};
