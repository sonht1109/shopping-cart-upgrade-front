import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import { apiToken, apiTokenInterceptor } from '../../common/axios';
import './style.css'

export default function ManageUsers() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        let jwt = localStorage.getItem('jwt') || ""
        apiToken("GET", "users", null, jwt)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    const onDeleteUser = (deletedUser: any)=> {
        let jwt = localStorage.getItem('jwt') || ""
        apiTokenInterceptor("POST", 'user/delete', deletedUser, jwt)
        .then(() => alert("User deleted !"))
        .then(() => {
            let tempUsers = users
            tempUsers = users.filter((user: any) => {
                console.log(user._id);
                return user._id !== deletedUser._id
            })
            setUsers([...tempUsers])
        })
        .catch(err => console.log(err))
    }

    const mapUsers = users.map((user: any, index: number) => {
        return (
            <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <button onClick={() => onDeleteUser(user    )}>Delete user</button>
                </td>
            </tr>
        )
    })

    return (
        <div className="wrapper manage-users">
            <Table responsive>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {mapUsers}
                </tbody>
            </Table>
        </div>
    )
}
