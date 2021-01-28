import React, {useState,useEffect} from 'react'
import {Table,Form,Button,Grid, Input, Icon,Item,Message,Segment,Card} from 'semantic-ui-react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
//import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {getUserDetails,updateUserProfile} from '../redux/actions/user'
import {listMyOrders} from '../redux/actions/order'
import {USER_UPDATE_PROFILE_RESET} from '../redux/constants/user'

const Profile = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state=> state.userDetails)
    const {loading, user, error} = userDetails

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state=> state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state=> state.orderListMy)
    const {
        loading:loadingOrders,
        error:errorOrders,
        orders
    } = orderListMy

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user,success])

    const submitHandler = e =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password dont match')
        }else{
            dispatch(updateUserProfile({_id:user._id,name,email,password}))
        }
    }

    return (
        <>
           <Grid.Row>
               <h2>User Profile</h2>
               {message && <Message warning>{message}</Message>}
               {}
               {success && <Message positive>Profile Update</Message>}
               {loading ? (
                 <Loader1/>
               ): error ? (
                 <Message warning>{error}</Message>
               ):(
                 <Item.Group relaxed>
                     <Item>
                         <Form oSubmit={submitHandler}>
                             <Form.Field id="name"
                                 control={Input}
                                 label="Name"
                                 icon="user"
                                 iconPosition="left"
                                 type="text"
                                 placeholder="Joe Doe"
                                 value={name}
                                 onChange={(e)=> setName(e.target.value)}/>

                              <Form.Field id="email"
                                 control={Input}
                                 label="Email"
                                 icon="envelope"
                                 iconPosition="left"
                                 type="email"
                                 placeholder="joe@outlook.com"
                                 value={email}
                                 onChange={(e)=> setEmail(e.target.value)}/>

                              <Form.Field id="password"
                                 control={Input}
                                 label="Password"
                                 icon="lock"
                                 iconPosition="left"
                                 type="password"
                                 placeholder="..........."
                                 value={password}
                                 onChange={(e)=> setPassword(e.target.value)}/>

                              <Form.Field id="confirmPassword"
                                  control={Input}
                                  label="Confirm Password"
                                  icon="lock"
                                  iconPosition="left"
                                  type="password"
                                  placeholder=".............."
                                  value={confirmPassword}
                                  onChange={(e)=> setConfirmPassword(e.target.value)}/>


                              <Button icon="pencil" color="orange" content="Update"/>
                         </Form>
                         <Item.Content>
                            <Segment floated="right">
                               <Item.Header as="h2">My Orders </Item.Header>
                               {loadingOrders ? (
                                 <Loader1/>
                               ): errorOrders ? (
                                 <Message warning>{errorOrders}</Message>
                               ):(
                                 <Card fluid style={{width:'800px'}}>
                                     <Table singleLine size="large">
                                         <Table.Header>
                                             <Table.Row>
                                                 <Table.HeaderCell>ID</Table.HeaderCell>
                                                 <Table.HeaderCell>DATE</Table.HeaderCell>
                                                 <Table.HeaderCell>TOTAL</Table.HeaderCell>
                                                 <Table.HeaderCell>PAID</Table.HeaderCell>
                                                 <Table.HeaderCell>DELIVERED</Table.HeaderCell>
                                                 <Table.HeaderCell>Action</Table.HeaderCell>
                                             </Table.Row>
                                         </Table.Header>
                                         <Table.Body>
                                             {orders.map((order)=>(
                                                 <Table.Row key={order._id}>
                                                     <Table.Cell>{order._id}</Table.Cell>
                                                     <Table.Cell>{order.createdAt.substring(0,10)}</Table.Cell>
                                                     <Table.Cell>{order.totalPrice}</Table.Cell>
                                                     <Table.Cell>
                                                         {order.isPaid ? (
                                                             order.paidAt.substring(0,10)
                                                         ):(
                                                             <Icon name="times circle outline" color="red"/>
                                                         )}
                                                     </Table.Cell>
                                                     <Table.Cell>
                                                         {order.isDelivered ? (
                                                             order.deliveredAt.substring(0,10)
                                                         ):(
                                                             <Icon name="times circle outline" color="red"/>
                                                         )}
                                                     </Table.Cell>
                                                     <Table.Cell>
                                                         <LinkContainer to={`/order/${order._id}`}>
                                                             <Button color="teal" size="small">
                                                                 Details
                                                             </Button>
                                                         </LinkContainer>
                                                     </Table.Cell>
                                                 </Table.Row>
                                             ))}
                                         </Table.Body>
                                     </Table>
                                 </Card>
                               )}
                            </Segment>
                         </Item.Content>
                     </Item>
                 </Item.Group>
               )}
           </Grid.Row>
        </>
    )
}

export default Profile
