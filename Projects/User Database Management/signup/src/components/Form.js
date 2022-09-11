import React , { Component } from 'react';
import { Form, Button } from "react-bootstrap";

import './styles.css'

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            username: '',
            dob: '',
            gender: '',
            status: 'active'
        };
        this.users = {}
        this.base_url = "http://localhost:3001/api/users";
        this.user_list = this.getUserList().then(res => {
           this.updateUsers(res)
        })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUsers(user_data) {
        for (const val in Object.keys(user_data)) {
            const username = user_data[val].username
            this.users[username] = user_data[val]
        }
    }

    async getUserList() {
        const get_all_url = `${this.base_url}/getAll`
        const user_list = await fetch(get_all_url, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        })
        return user_list.json();
    } 

    checkValidity() {
        const check_validity_for = {email: false, username: true}
        // Checking Email Validity
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))
        {
            check_validity_for['email'] = true;
        }

        // Checking Username Duplicacy
        if(Object.keys(this.users).includes(this.state.username)) {
            check_validity_for['username'] = false
        }

        for (const input_field in check_validity_for) {
            if (check_validity_for[input_field] === false) {
                console.log("Invalid Field " + input_field)
                return ({[input_field]: check_validity_for[input_field]})
            }
        } 
    }
    
    handleChange(event) {
        const field = event.target.id
        if (field === 'name') {
            this.setState({
                ...this.state,
                name: event.target.value
            });
        } else if (field === 'email') {
            this.setState({
                ...this.state,
                email: event.target.value
            });
        } else if (field === 'password') {
            this.setState({
                ...this.state,
                password: event.target.value
            });
        } else if (field === 'username') {
            this.setState({
                ...this.state,
                username: event.target.value
            });
        } else if (field === 'dob') {
            this.setState({
                ...this.state,
                dob: event.target.value
            });
        } else if (field === 'gender') {
            this.setState({
                ...this.state,
                gender: event.target.value
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const valid = this.checkValidity()
        if (valid) {
            if (Object.keys(valid)[0] === 'username') {
                alert(`Username already taken. Please try something else`);
            } else {alert(`Invalid Entry for ${Object.keys(valid)[0]}`);}
        } else {
            const url = `${this.base_url}/create`
            const data = {}
            data['id'] = Math.floor(Math.random() * 10000).toString();
            for (const [key, value] of Object.entries(this.state)) {
                data[key] = value
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                console.log(`API Response: ${res.json()}`);
            })
        }
        event.target.reset();
    }

    genForm = () => {
        return (
            <div className='form-display'>
                <h3>Sign Up</h3>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control id="name" type="text" placeholder="Enter Full Name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control id="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control id="username" type="text" placeholder="Enter username" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control id="dob" type="date" name="dob" placeholder="Date of Birth" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">   
                        <Form.Label>Select Gender</Form.Label>
                        <Form.Control id="gender" as="select" onChange={this.handleChange}>
                            <option>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }
    
    render() {
        return <div>{this.genForm()}</div>;
    }
};