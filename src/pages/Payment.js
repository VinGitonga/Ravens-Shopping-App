import React, {useState} from 'react'
import {Form,Button,Container,Radio} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from "../redux/actions/cart";


const Payment = ({history}) => {
    const cart = useSelector(state=> state.cart)

    const {shippingAddress} = cart

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = e =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Container textAlign="center">
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Field id="paypal"
                    control={Radio}
                    label="PayPal or Credit Card"
                    value='PayPal'
                    name="paymentMethod"
                    checked
                    onChange={(e)=> setPaymentMethod(e.target.value)}/>

                <Button primary>Continue</Button>
            </Form>
        </Container>
    )
}

export default Payment;
