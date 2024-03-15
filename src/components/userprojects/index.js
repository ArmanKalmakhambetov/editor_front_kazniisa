import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserProjectsAction,
  getBannerByCompanyIdAction,
  getUserInfo,
} from "@/store/slices/authSlice";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function UserProjects() {
  const allUserProjects = useSelector((state) => state.auth.allProjects);
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  console.log(router.pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserProjectsAction());
    console.log(allUserProjects);
  }, [dispatch]); // Listen to changes in CurrentCompany and banners

  useEffect(() => {
    setProjects(allUserProjects); // Update projects when allUserProjects changes
  }, [allUserProjects]);

  const handlePassId = (id) => {
    console.log(id);
    router.push(`/project/${id}`);

  }

  return (
    <>
      {projects.map((item) => (
        <div key={item.id}>
          <button onClick={() => {handlePassId(item.id)}}>{item.project_name}</button>
        </div>
      ))}
    </>
  );
}
