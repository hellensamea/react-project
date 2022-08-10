import { useEffect, useState } from 'react'
import styles from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

function ProjectForm({btnText}){
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then((resp) => resp.json())
    .then((data) => { setCategories(data)})
    .catch((err) => console.log(err))
    }, [])

    return (
        <form className={styles.form}>
            <div><Input type="text" text="Project name" name="name" placeholder="Insert the project name"/></div>
            <div>
                <Input type="number" text="Project budget" name="budget" placeholder="Insert the project total budget" />
            </div>
            <div> <Select name="category_id" text="Select a category" options={categories}/> </div>
            <div> <SubmitButton text={btnText} /> </div>
        </form>
    )
}
export default ProjectForm