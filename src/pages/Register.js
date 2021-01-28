import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Card, Form, Container, Input, Button,Message} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {register} from '../redux/actions/user'

const Register = ({location,history})=> {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = e => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords dont match')
        }else{
            dispatch(register(name,email,password))
        }
    }

    return (
        <Container textAlign="justified">
            <Card centered style={{width:'400px'}}>
                <Message attached icon="settings"
                    header="Get Started!"
                    content="Create an account"
                    color="blue"/>
                {message && <Message1 variant="warning">{message}</Message1>}
                {error && <Message1 variant="warning">{error}</Message1>}
                {loading && <Loader1/>}
                <Form onSubmit={submitHandler} >
                    <Form.Field id="name"
                       control={Input}
                       type="text"
                       label="Name"
                       placeholder="Joe Doe"
                       value={name}
                       onChange={(e)=> setName(e.target.value)}/>
                    <Form.Field id="email"
                        control={Input}
                        type="email"
                        label="Email"
                        placeholder="you@outlook.com"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}/>

                    <Form.Field id="password"
                       control={Input}
                       type="password"
                       label="Password"
                       placeholder="............."
                       value={password}
                       onChange={(e)=> setPassword(e.target.value)}/>

                    <Form.Field id="confirmPassword"
                       control={Input}
                       type="password"
                       label="Confirm Password"
                       placeholder="............."
                       value={confirmPassword}
                       onChange={(e)=> setConfirmPassword(e.target.value)}/>


                    <Button
                       icon="signup"
                       color="orange"
                       content="Sign Up"
                       />
                </Form>
                <Message attached="bottom" warning>
                    Have an Account? {' '}
                    <Link to={redirect ? `/login?redirect=${redirect}`:'/login'} style={{color:'teal'}} >
                        Login
                    </Link>
                </Message>
            </Card>
        </Container>
    )
}

export default Register
