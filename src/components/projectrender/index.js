import React from "react";
import Image from "next/image";
import projBack from "@/../../public/image/projectCardBack.jpg";

export default function ProjectRender({ allProjects }) {
  return (
    <>
      {allProjects.length >= 1 ? (
        allProjects.map((item, index) => (
          <div key={index} className="col-sm-3 button__card">
            <div className="card">
              <Image src={projBack} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.project_name}</h5>
                <p class="card-text">
                  Нажмите на карточку проекта чтобы перейти к нему
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Проектов нет, создайте новый проект</div>
      )}
    </>
  );
}
