import React , { Component } from 'react';
import Table from 'react-bootstrap/Table';

import "./styles.css";

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            errors: null
        };
        this.base_url = "http://localhost:3001/api/users";
        this.updateState = this.updateState.bind(this);
        this.submitState = this.submitState.bind(this);
    }

    async getUsers() {
        const response = await fetch(`${this.base_url}/getAll`).then(
            data => {
                return data.json();
            }
        ).then(users => {
            this.setState({
                users,
                isLoading: false
              });
        })
    }

    componentDidMount() {
        this.getUsers();
    }

    submitState(user_data) {
        const updated_status = document.getElementById(`update-btn-${user_data.id}`).status
        user_data = {...user_data, status: updated_status}
        
        const url = `${this.base_url}/${user_data.id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_data)
        })
        .then(res => {
            console.log(`API Response: ${res.json()}`);
        })
    }

    updateState = (event) => {
        let user_id = event.target.id.split('_')[1]
        if (event.target.id.includes('block')) {
            if (event.target.checked) {
                let elem_id = event.target.id.replace('block', 'active')
                document.getElementById(elem_id).checked = false;
                document.getElementById(`update-btn-${user_id}`).status = "block";
            }
        } else if (event.target.id.includes('active')) {
            if (event.target.checked) {
                let elem_id = event.target.id.replace('active', 'block')
                document.getElementById(elem_id).checked = false;
                document.getElementById(`update-btn-${user_id}`).status = "active";
            }
        }
        document.getElementById(`update-btn-${user_id}`).style.display = "block";
    }

    genUserList = () => {
        const { isLoading, users } = this.state;
        return (
            <div className='list-display'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Date of birth</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading ? (
                            users.map((user, index) => {
                                return(
                                    <tr key={user.id}>
                                        <td>{index+1}</td>
                                        <td onClick={() => window.location = `mailto:${user.email}`}>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.dob}</td>
                                        <td>{user.gender}</td>
                                        {(() => {
                                        console.log(user.status)
                                        if (user.status === 'active'){
                                            return (
                                                <td>
                                                    <input type="checkbox" id={"active_" + user.id} value="active" checked onChange={this.updateState}/>
                                                    <label htmlFor="active" className='px-2'>Active</label>
                                                    <input type="checkbox" id={"block_" + user.id} value="block" onChange={this.updateState}/>
                                                    <label htmlFor="block" className='px-2'>Block</label>
                                                </td>
                                            )
                                        } else if (user.status === 'block'){
                                            return(
                                                <td>
                                                    <input type="checkbox" id={"active_" + user.id} value="active" onChange={this.updateState}/>
                                                    <label htmlFor="active" className='px-2'>Active</label>
                                                    <input type="checkbox" id={"block_" + user.id} value="block" checked onChange={this.updateState}/>
                                                    <label htmlFor="block" className='px-2'>Block</label>
                                                </td>
                                            )
                                        }
                                    
                                        return null;
                                        })()}
                                        <td>
                                            <button 
                                                id={"update-btn-" + user.id}
                                                type="button"
                                                status="none" 
                                                className="btn btn-outline-dark float-right" 
                                                style={{display: 'none'}} 
                                                onClick={() => this.submitState(user)}
                                            >
                                                    Update State
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr></tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }

    render() {
        return <div>{this.genUserList()}</div>;
    }
};