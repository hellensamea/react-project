import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject (){
    return (
        <div className={styles.np_container}>
            <h1>Create a project</h1>
            <ProjectForm btnText="Create"/>
        </div>
    )
}
export default NewProject