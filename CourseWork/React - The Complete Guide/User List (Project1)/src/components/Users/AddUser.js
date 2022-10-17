import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {

    const [enteredUsername, setUsername] = useState('');
    const [enteredAge, setAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = event => {
        event.preventDefault();
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Invalid input",
                message: "Please enter a valid name and age (non-empty values)."
            }); 
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: "Invalid age",
                message: "Please enter a valid age (> 0)."
            }); 
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setUsername('');
        setAge('');
    };

    const userNameChangehandler = event => {
        setUsername(event.target.value);
    };

    const ageChangehandler = event => {
        setAge(event.target.value);
    };

    const errorHandler = () => {
        setError(null);
    }
    
    return (
        <div>
            {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label forhtml="username">Name</label>
                    <input type="text" value={enteredUsername} id="username" onChange={userNameChangehandler}/>
                    <label forhtml="age">Age (Years)</label>
                    <input type="number" value={enteredAge} id="age" onChange={ageChangehandler}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    )
};

export default AddUser;