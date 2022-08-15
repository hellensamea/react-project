import { useEffect, useState } from 'react'
import Container from '../layout/Container'
import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import ProjectCard from '../project/ProjectCard'

function Project (){
    const{id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then((data) => {
            setProject(data)})
        .catch((err) => console.log(err))
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    return(
        /*<p><span> Category: </span>{project.category.name}</p>*/ 
        <div className={styles.project_details}>
            <Container>
                <div className={styles.details_container}>
                    <h2>Project: {project.name}</h2>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                       {!showProjectForm ? 'Edit project' : 'Close'}
                    </button>
                    {!showProjectForm ?
                    (<div className={styles.service_form_container}>
                        <p><span> Total budget: </span> US${project.budget}</p>
                        <p><span> Total used: </span> US${project.costs}</p>
                        </div>) :
                    (<div><p>details</p></div>)}
                </div>
            </Container>  
        </div>
    )
}
export default Project