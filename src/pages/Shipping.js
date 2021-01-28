import React, {useState} from 'react'
import {Form,Button, Container, Card, Input} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../redux/actions/cart'

const Shipping = ({history}) => {
    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode,country}))
        history.push('/payment')
    }

    return (
        <Container textAlign="justified">
            <CheckoutSteps step1 step2/>
            <Card centered>
                <Card.Header as="h1">
                    Shipping
                </Card.Header>
                <Form onSubmit={submitHandler}>
                    <Form.Field id="address"
                        control={Input}
                        type="text"
                        placeholder="Address"
                        label="Address"
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                        required/>
                    <Form.Field id="city"
                       control={Input}
                       type="text"
                       placeholder="City"
                       label="City"
                       value={city}
                       onChange={(e)=> setCity(e.target.value)}
                       required/>
                    
                    <Form.Field id='postalCode'
                       control={Input}
                       type="text"
                       placeholder="Postal Code"
                       label="Postal Code"
                       value={postalCode}
                       onChange={(e)=> setPostalCode(e.target.value)}
                       required/>
                    
                    <Form.Field id="country"
                      control={Input}
                      type="text"
                      placeholder="Country"
                      label="Country"
                      value={country}
                      onChange={(e)=> setCountry(e.target.value)}
                      required/>

                    <Button primary>
                        Continue
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default Shipping