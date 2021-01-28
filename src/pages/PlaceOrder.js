import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Grid, List, Image, Card,Item,Segment,Header,Icon,Message} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
//import Message1 from '../components/Message1'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from "../redux/actions/order";
import {ORDER_CREATE_RESET} from '../redux/constants/order'
import { USER_DETAILS_RESET } from "../redux/constants/user";

const PlaceOrder = ({history}) =>{
    const dispatch = useDispatch()

    const cart = useSelector((state)=> state.cart)

    if(!cart.shippingAddress.address){
        history.push('/shipping')
    }else if(!cart.paymentMethod){
        history.push('/payment')
    }

    //Calc prices
    const addDecimals = (num) =>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0)
    )

    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0: 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice)+
        Number(cart.shippingPrice)+
        Number(cart.taxPrice)
    ).toFixed(2)

    const orderCreate = useSelector(state=> state.orderCreate)
    const {order, success, error} = orderCreate

    useEffect(()=>{
        if(success){
            history.push(`/order/${order._id}`)
            dispatch({type: USER_DETAILS_RESET})
            dispatch({type: ORDER_CREATE_RESET})
        }
    },[history,success,dispatch,order])

    const placeOrderHandler = () =>{
        dispatch(
            createOrder({
                orderItems:cart.cartItems,
                shippingAddress:cart.shippingAddress,
                paymentMethod:cart.paymentMethod,
                itemsPrice:cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice
            })
        )
    }

    return (
        <>
           <CheckoutSteps step1 step2 step3 step4/>
           <br/>
           <br/>

               <Grid.Column width={13}>
                   <List>
                       <List.Item>
                           <h2>Shipping</h2>
                           <p>
                               <strong>Address: </strong>
                               {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                               {cart.shippingAddress.postalCode}, {' '}
                               {cart.shippingAddress.country}
                           </p>
                       </List.Item>

                       <List.Item>
                           <h2>Payment Method</h2>
                           <strong>Method: </strong>
                           {cart.paymentMethod}
                       </List.Item>
                     </List>

                     <h2>Order Items </h2>
                     {cart.cartItems.length === 0 ? (
                         <Segment secondary color="teal" inverted textAlign="center" placeholder>
                            <Header icon>
                                <Icon name="shopping basket"/>
                                No products in your cart. Add Some Yoo!
                            </Header>
                            <Link to='/'>
                               <Button color="orange">View products</Button>
                            </Link>
                         </Segment>
                      ):(
                          <Segment.Group horizontal>
                            <Segment>
                              <Item.Group divided>
                                 {cart.cartItems.map((item,index)=>(
                                     <Item key={index}>
                                         <Image src={item.image} alt={item.name}
                                              size="medium"
                                              circular/>


                                        <Item.Content style={{paddingLeft:'12%'}}>
                                           <Item.Header as ="a">
                                              <Link to={`/product/${item.product}`}>
                                                  {item.name}
                                              </Link>
                                           </Item.Header>
                                           <Item.Description as="h3">
                                               {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                           </Item.Description>
                                        </Item.Content>
                                    </Item>
                                    ))}
                                 </Item.Group>
                                 </Segment>
                                  <Segment>
                                    <Item.Group>
                                        <Item.Content>
                                           <Card>
                                               <Card.Header as="h3">Order Summary</Card.Header>
                                               <Card.Content>
                                                   <Card.Meta as="h4" style={{color:'olive'}}>Items</Card.Meta>
                                                   <Card.Description>$ {cart.itemsPrice}</Card.Description>
                                                   <Card.Meta as="h4" style={{color:'olive'}}>Shipping</Card.Meta>
                                                   <Card.Description>$ {cart.shippingPrice}</Card.Description>
                                                   <Card.Meta as="h4" style={{color:'olive'}}>Tax</Card.Meta>
                                                   <Card.Description>$ {cart.taxPrice}</Card.Description>
                                                   <Card.Meta as="h4" style={{color:'olive'}}>Total Price</Card.Meta>
                                                   <Card.Description>$ {cart.totalPrice}</Card.Description>
                                                   <Card.Meta>
                                                       {error && <Message negative>{error}</Message>}
                                                   </Card.Meta>
                                            </Card.Content>
                                               <Card.Content extra>
                                                  {cart.cartItems.length === 0 ? (
                                                      <Button color="orange" disabled>
                                                         Place Order
                                                      </Button>
                                                  ): (
                                                      <Button color="orange" onClick={placeOrderHandler}>
                                                         Place Order
                                                      </Button>
                                                  )}
                                               </Card.Content>
                                           </Card>
                                        </Item.Content>
                                       </Item.Group>
                                  </Segment>

                          </Segment.Group>
                        )}
               </Grid.Column>

        </>
    )
}

export default PlaceOrder
