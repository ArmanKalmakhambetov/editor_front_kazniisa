import React, { useEffect, useState } from "react";
import UserProjects from "../userprojects";

export default function Layout1() {
  return (
    <div className="layout__box">
      <div className="layout__left">
        <div className="layout__left-top">
          <button>Projects</button>
        </div>
        <div className="layout__left-bot">
          <button>Account</button>
        </div>
      </div>
      <div className="layout__right">
        <div className="layout__right-header"></div>
        <div className="layout__right-body"></div>
      </div>
    </div>
  );
}
