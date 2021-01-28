import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Container, Card, Icon} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {listUsers, deleteUser} from '../redux/actions/user'

const UserList = ({history})=>{
    const dispatch = useDispatch()

    const userList = useSelector(state=> state.userList)
    const {loading , error, users} = userList

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=> state.userDelete)
    const {
        success:successDelete
    } = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }else{
            history.push('/login')
        }
    },[dispatch, userInfo, history, successDelete])

    const deleteHandler = id =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }

    return (
        <Container textAlign="justified">
            <Card fluid>
                <Card.Header as="h1" textAlign="center">
                    Users
                </Card.Header>
                {loading ? (
                    <Loader1/>
                ): error ? (
                    <Message1 variant="warning">{error}</Message1>
                ):(
                    <Table singleLine striped size="small">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>NAME</Table.HeaderCell>
                                <Table.HeaderCell>EMAIL</Table.HeaderCell>
                                <Table.HeaderCell>ADMIN</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {users.map((user)=>(
                                <Table.Row key={user._id}>
                                    <Table.Cell>{user._id}</Table.Cell>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>
                                        <a href={`mailto:${user.email}`}>{user.email}</a>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.isAdmin ? (
                                            <Icon name="check circle" color="green"/>
                                        ):(
                                            <Icon name="times circle" color="red"/>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button color="grey" size="small" icon>
                                                <Icon name="pencil alternate"/>
                                            </Button>
                                        </LinkContainer>
                                        <Button color="red" size="small" icon onClick={()=> deleteHandler(user._id)}>
                                            <Icon name="trash alternate"/>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </Card>
        </Container>
    )
}

export default UserList
