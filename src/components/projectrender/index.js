import React from "react";
import Image from "next/image";
import projBack from "@/../../public/image/projectCardBack.jpg";

export default function ProjectRender({ allProjects, onProjectClick }) {
  return (
    <>
      {allProjects.length >= 1 ? (
        allProjects.map((item, index) => (
          <div
            key={index}
            className="col-sm-3 button__card"
            onClick={() => onProjectClick(item.id)}
          >
            <div className="card">
              <Image src={projBack} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.project_name}</h5>
                <p className="card-text">
                  Нажмите на карточку проекта чтобы перейти к нему
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            height: "70vh",
          }}
          className="d-flex align-items-center justify-content-center"
        >
          Проектов нет, нажмите на кнопку + чтобы создать документ
        </div>
      )}
    </>
  );
}
