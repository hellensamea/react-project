import Container from '../layout/Container'
import { useLocation } from 'react-router-dom'
import Message from "../layout/Message"
import styles from './Projects.module.css'
import LinkButton from '../layout/LinkButton'
import { useEffect, useState } from 'react'
import ProjectCard from '../project/ProjectCard'

function Projects(){
    const [projects, setProjects] = useState([])
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ''
    if (location.state){
        message = location.state.message
    }
    
    useEffect(() =>{
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)})
        .catch((err) => console.log(err))
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Project successfully deleted.')
        })
        .catch(err => console.log(err))
    }

    return (
    <div className={styles.project_container}>
        <div><h2>My Projects</h2></div>
        {message && <Message type='success' msg={message}/>}
        {projectMessage && <Message type='success' msg={projectMessage}/>}
        <Container customClass='start'>
            {projects.length > 0 && projects.map((project) => (
                <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} handleRemove={removeProject} />
            ))}
            {projects.length === 0 && (<p>No projects yet..</p>)            }
        </Container>
        <div><LinkButton to="/newproject" text="Create a project"/></div>
    </div>
    )
}
export default Projects