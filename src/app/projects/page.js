'use client'
import UserProjects from "@/components/userprojects"
import CreateProject from "@/components/createproject"
//TODO:отображение всех проектов из базы с помощью селектора если нет данных из базы, то показывать что нет проектов и предложить создать новый проект
export default function ProjectsPage() {
  return (
    <>
    <UserProjects/>
    <CreateProject/>
    </>
  )
}
