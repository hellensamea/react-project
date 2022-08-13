import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import {  useNavigate  } from 'react-router-dom'

function NewProject (){

    const history =  useNavigate()

    function createPost(project){
        project.costs = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: { 'Content-type': 'application/json',},
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {console.log(data)
            history('/projects', {state:{message: 'Project successfuly created!'}})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.np_container}>
            <h1>Create a project</h1>
            <ProjectForm handleSubmit={createPost} btnText="Create"/>
        </div>
    )
}
export default NewProject