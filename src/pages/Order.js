import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import {Grid, List, Image, Card,Button,Segment,Item} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {
    getOrderDetails,
    payOrder,
    deliverOrder
} from '../redux/actions/order'
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET
} from '../redux/constants/order'

const Order = ({match, history}) =>{
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch= useDispatch()
    const orderDetails = useSelector(state=> state.orderDetails)
    const {order,loading,error} = orderDetails

    const orderPay = useSelector(state=> state.orderPay)
    const {
        loading:loadingPay,
        success:successPay
    } = orderPay

    const orderDeliver = useSelector(state=> state.orderDeliver)
    const {
        loading:loadingDeliver,
        success:successDeliver
    } = orderDeliver;

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    if(!loading){
        // calc prices
        const addDecimals = (num) =>{
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc,item) => acc + item.price, 0)
        )
    }

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver || order._id !== orderId){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            }else{
                setSdkReady(true)
            }
        }
    },[dispatch, orderId, successPay, successDeliver, order,history,userInfo])


    const successPaymentHandler = (paymentResult) =>{
        console.log(paymentResult)
        dispatch(payOrder(orderId,paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }



    return loading ? (
        <Loader1/>
    ): error ? (
        <Message1 variant="warning">{error}</Message1>
    ):(
        <>
          <h1>Order {order._id}</h1>
          <Grid.Row centered columns={2}>
              <Grid.Column width={13}>
                  <List>
                      <List.Item>
                          <h2>Shipping</h2>
                          <p>
                              <strong>Name: </strong> {order.user.name}
                          </p>
                          <p>
                              <strong>Email: </strong> {' '}
                              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                          </p>
                          <p>
                              <strong>Address: </strong>
                              {order.shippingAddress.address}, {order.shippingAddress.city} {' '}
                              {order.shippingAddress.postalCode}, {' '}
                              {order.shippingAddress.country}
                          </p>
                          {order.isDelivered ? (
                              <Message1 variant="info">
                                  Delivered on {order.deliveredAt}
                              </Message1>
                          ):(
                              <Message1 variant="warning">Not Delivered</Message1>
                          )}
                      </List.Item>

                      <List.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message1 variant="info">Paid on {order.paidAt}</Message1>
                            ):(
                                <Message1 variant="warning">Not Paid</Message1>
                            )}
                      </List.Item>

                  </List>


                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                    <Message1 variant="info">Order is empty</Message1>
                ):(
                  <Segment.Group horizontal>
                     <Segment>
                        <Item.Group divided>
                           {order.orderItems.map((item,index)=>(
                             <Item key={index}>
                                <Image src={item.image} alt={item.name}
                                    size="medium"
                                    circular/>

                                <Item.Content style={{paddingLeft:'12%'}}>
                                   <Item.Header as="a">
                                       <Link to={`/product/${item.product}`}>
                                          {item.name}
                                       </Link>
                                   </Item.Header>
                                   <Item.Description as="h3">
                                      {item.qty} x ${item.price} = $ {(item.qty * item.price).toFixed(2)}
                                   </Item.Description>
                                </Item.Content>
                             </Item>
                           ))}
                        </Item.Group>
                     </Segment>
                     <Segment>
                         <Item.Group>
                            <Card>
                                <Card.Header as="h3">Order Summary</Card.Header>
                                <Card.Content>
                                    <Card.Meta as="h4" style={{color:'olive'}}>Items</Card.Meta>
                                    <Card.Description>{order.itemsPrice}</Card.Description>
                                    <Card.Meta as="h4" style={{color:'olive'}}>Shipping</Card.Meta>
                                    <Card.Description>{order.shippingPrice}</Card.Description>
                                    <Card.Meta as="h4" style={{color:'olive'}}>Tax</Card.Meta>
                                    <Card.Description>{order.taxPrice}</Card.Description>
                                    <Card.Meta as="h4" style={{color:'olive'}}>Total Price</Card.Meta>
                                    <Card.Description>{order.totalPrice}</Card.Description>
                                </Card.Content>
                                {!order.isPaid && (
                                  <Card.Content extra>
                                     {loadingPay && <Loader1/>}
                                     {!sdkReady ? (
                                       <Loader1/>
                                     ):(
                                       <PayPalButton
                                          amount={order.totalPrice}
                                          onSuccess={successPaymentHandler}/>
                                     )}
                                  </Card.Content>
                                )}
                                {loadingDeliver && <Loader1/>}
                                {userInfo &&
                                  userInfo.isAdmin &&
                                  order.isPaid &&
                                  !order.isDelivered && (
                                    <Card.Content extra>
                                       <Button size="mini" color="orange"
                                           onClick={deliverHandler}>
                                             Mark as Delivered
                                        </Button>
                                    </Card.Content>
                                  )
                                }
                            </Card>
                         </Item.Group>
                     </Segment>
                  </Segment.Group>
                )}
              </Grid.Column>
          </Grid.Row>
        </>
    )
}

export default Order
