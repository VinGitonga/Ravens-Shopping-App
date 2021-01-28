import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button,Container, Card,Icon} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {listOrders}  from '../redux/actions/order'

const OrderList = ({history}) =>{
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }
    },[dispatch,history,userInfo])

    return (
        <Container textAlign="justified">
            <Card fluid>
                <Card.Header as="h1">Orders</Card.Header>
                {loading ? (
                    <Loader1/>
                ): error ? (
                    <Message1 variant="warning">{error}</Message1>
                ): (
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>USER</Table.HeaderCell>
                                <Table.HeaderCell>DATE</Table.HeaderCell>
                                <Table.HeaderCell>TOTAL</Table.HeaderCell>
                                <Table.HeaderCell>PAID</Table.HeaderCell>
                                <Table.HeaderCell>DELIVERED</Table.HeaderCell>
                                <Table.HeaderCell>ACTION</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {orders.map((order)=>(
                                <Table.Row key={order._id}>
                                    <Table.Cell>{order._id}</Table.Cell>
                                    <Table.Cell>{order.user && order.user.name}</Table.Cell>
                                    <Table.Cell>{order.createdAt.substring(0,10)}</Table.Cell>
                                    <Table.Cell>$ {order.totalPrice}</Table.Cell>
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
                                            <Icon name="times circle outline" color="red" />
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button color="grey" icon>
                                                <Icon name="eye" />
                                            </Button>
                                        </LinkContainer>
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

export default OrderList;
