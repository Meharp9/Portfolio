import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from './AddUser.module.css';
import { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    
    const [error, setError] = useState('');

    const addUserHandler = event => {
        event.preventDefault();
        const username = nameInputRef.current.value;
        const age = ageInputRef.current.value;
        
        if (username.trim().length === 0 || age.trim().length === 0) {
            setError({
                title: "Invalid Input",
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        }
        if (+age < 1) {
            setError({
                title: "Invalid Age",
                message: "Please enter a valid age (> 0)."
            });
            return;
        }
        props.onAddUser(username, age);
        resetData();
    }

    const resetData = () => {
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    const errorHandler = () => {
        setError(null)
    }

    return <>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" ref={nameInputRef}/>
                <label htmlFor="age">Age (Years)</label>
                <input id="age" type="number" ref={ageInputRef}/>
                <Button type="submit"> Add User</Button>
            </form>
        </Card>
    </>
};

export default AddUser;