import React, {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import { Form,Button,Card,Container,Input,Message,Icon} from "semantic-ui-react";
import {useDispatch, useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {login} from '../redux/actions/user'

const Login = ({location,history})=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state=> state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
        <Container textAlign= "justified">
            <br/>
            <Card centered style={{width:'400px'}}>
                <Message attached icon="privacy"
                    header="Welcome Back!"
                    content="Login with Email and Password"
                    color="blue"/>
                {error && <Message1 variant="warning">{error}</Message1>}
                {loading && <Loader1/>}
                <Form onSubmit={submitHandler}>
                    <Form.Field id='email'
                       control={Input}
                       label="Email"
                       placeholder="you@outlook.com"
                       type='email'
                       value={email}
                       icon="envelope"
                       iconPosition='left'
                       onChange={(e) => setEmail(e.target.value)}/>

                    <Form.Field id='password'
                        control={Input}
                        icon='lock'
                        iconPosition='left'
                        label='Password'
                        placeholder="............"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    <Button
                       icon="signup"
                       color="orange"
                       content="Login"
                       />
                </Form>
                <br/>
                <br/>
                <Message attached="bottom" warning>
                    <Icon name="help"/>
                    New Customer? {' '}
                    <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>
                        Register
                    </Link>
                </Message>
            </Card>
        </Container>
    )
}

export default Login
