import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Container, Card, Input, Checkbox, Icon,Message} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {getUserDetails, updateUser} from '../redux/actions/user'
import {USER_UPDATE_RESET} from '../redux/constants/user'

const UserEdit = ({match, history})=>{
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state=> state.userUpdate)
    const {
        loading:loadingUpdate,
        error:errorUpdate,
        success:successUpdate
    } = userUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    },[dispatch, history, userId, user, successUpdate])

    const submitHandler = e =>{
        e.preventDefault()
        dispatch(updateUser({_id:userId, name, email, isAdmin}))
    }

    return (
        <>
           <Link to='/admin/userlist'>
               Go Back
           </Link>
           <Container textAlign="justified">
               <Card centered style={{width:'400px'}}>
                   <Message attached icon="settings"
                       header="Modify User"
                       content="Edit User registration info"
                       color="blue"/>
                   {loadingUpdate && <Loader1/>}
                   {errorUpdate && <Message1 variant="warning">{errorUpdate}</Message1>}
                   {loading ? (
                       <Loader1/>
                   ): error ? (
                       <Message1 variant="warning">{error}</Message1>
                   ):(
                       <Form onSubmit={submitHandler}>
                           <Form.Field id="name"
                             control={Input}
                             type="text"
                             icon="user"
                             iconPosition="left"
                             label="Name"
                             placeholder="Joe Doe"
                             value={name}
                             onChange={(e)=> setName(e.target.value)}/>

                            <Form.Field id="email"
                               control={Input}
                               type="email"
                               icon="envelope"
                               iconPosition="left"
                               label="Email"
                               placeholder="you@outlook.com"
                               value={email}
                               onChange={(e)=> setEmail(e.target.value)}/>

                            <Form.Field id="isAdmin"
                                control={Checkbox}
                                label="isAdmin"
                                value={isAdmin}
                                onChange={(e)=> setIsAdmin(e.target.value)}/>

                            <Button color="orange" icon>
                                <Icon name="pencil alternate"/>Update
                            </Button>
                       </Form>
                   )}
               </Card>
           </Container>
        </>
    )
}

export default UserEdit
