import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from './AddUser.module.css';
import { useState } from "react";
import ErrorModal from "../UI/ErrorModal";

const AddUser = props => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');

    const changeValueHandler = event => {
        if (event.target.id === "username") {
            setUsername(event.target.value);
        } else if (event.target.id === "age") {
            setAge(event.target.value);
        }
    }

    const addUserHandler = event => {
        event.preventDefault();
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
        setUsername('');
        setAge('');
    }

    const errorHandler = () => {
        setError(null)
    }

    return <div>
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className={classes.input}>
            <form onSubmit={addUserHandler}>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={username} onChange={changeValueHandler}/>
                <label htmlFor="age">Age (Years)</label>
                <input id="age" type="number" value={age} onChange={changeValueHandler}/>
                <Button type="submit"> Add User</Button>
            </form>
        </Card>
    </div>
};

export default AddUser;