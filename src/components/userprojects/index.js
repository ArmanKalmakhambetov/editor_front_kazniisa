import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserProjectsAction, setCurrentProjIdReducer } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Documents from "../documents";

export default function UserProjects() {
  const allUserProjects = useSelector((state) => state.auth.allProjects);
  const currentProjId = useSelector((state) => state.auth.currentProjId);
  
  const [selectedProjectId, setSelectedProjectId] = useState(currentProjId);
  const router = useRouter();
  console.log(router.pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    
      dispatch(getAllUserProjectsAction());
      console.log(allUserProjects);
    
  }, [dispatch, currentProjId]);

  const handlePassId = (id) => {
    dispatch(setCurrentProjIdReducer(id));

    
    console.log(id);
  };

  console.log(currentProjId)

  return (
    <>
      {allUserProjects.map((item) => (
        <div key={item.id}>
          <button
            onClick={() => {
              handlePassId(item.id)
            }}
          >
            {item.project_name}
          </button>
        </div>
      ))}
      {currentProjId && <Documents id={currentProjId}/>}
      {currentProjId !== null ? (
              <h1>не null</h1>

            ) : (
              <h1>null</h1>
            )}
    </>
  );
}
