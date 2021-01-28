import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Grid,Image,Button,Icon,Header,Segment,Item} from 'semantic-ui-react'
import {Form} from 'react-bootstrap'
//import Message1 from '../components/Message1'
import {addToCart, removeFromCart} from '../redux/actions/cart'

const Cart = ({match, location, history}) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>{
        history.push('/login?redirect=shipping')
    }

    return (
        <Grid.Row>
            <Grid.Column width={12}>
                <h1 style={{textAlign:'center',alignItems:'center'}}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Segment secondary color="teal" inverted textAlign="center" placeholder>
                        <Header icon>
                           <Icon name="shopping basket"/>
                           No products in your cart. Add Some Yoo!
                        </Header>
                        <Link to='/'>
                           <Button color="orange">View Products</Button>
                        </Link>
                    </Segment>
                ):(
                  <>
                    <Segment secondary placeholder style={{color:'aquamarine'}}>
                       <Item.Group divided>
                           {cartItems.map((item)=>(
                                <Item key={item.product}>
                                   <Image src={item.image} size="medium" circular alt={item.name}/>

                                   <Item.Content>
                                       <Item.Header as="a">
                                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                                       </Item.Header>
                                       <Item.Meta as="h3">
                                         <span> ${item.price} </span>
                                       </Item.Meta>
                                       <Item.Description>
                                          <Form.Control
                                             as="select"
                                             value={item.qty}
                                             onChange={(e)=> dispatch(
                                                 addToCart(item.product, Number(e.target.value))
                                             )}>
                                                 {[...Array(item.countInStock).keys()].map((x)=>(
                                                     <option key={x+1} value={x+1}>
                                                         {x+1}
                                                     </option>
                                                 ))}
                                             </Form.Control>
                                       </Item.Description>
                                       <Item.Extra>
                                           <Button color="violet" floated="right" onClick={()=> removeFromCartHandler(item.product)}>
                                              <Icon name="trash alternate"/>
                                           </Button>
                                       </Item.Extra>
                                   </Item.Content> 
                                </Item>
                            ))}
                       </Item.Group>
                    </Segment>
                    </>
                )}

            </Grid.Column>
            <Segment secondary clearing style={{color:'aquamarine'}}>
               <Item>
                  <Item.Header as="h2" style={{color:'olive'}}>
                     Subtotal ({cartItems.reduce((acc,item)=>acc + item.qty, 0)}) items
                  </Item.Header>
                  <Item.Content>
                    <Item.Meta style={{color:'black',fontSize:'1rem'}}>
                      $
                      {
                           cartItems
                               .reduce((acc,item)=> acc + item.qty * item.price, 0)
                               .toFixed(2)
                      }
                    </Item.Meta>
                    <Item.Extra>
                       {cartItems.length === 0 ? (
                           <Button
                              floated="right"
                              color="orange"
                              disabled>Proceed to Checkout</Button>
                        ):(
                           <Button 
                              floated="right"
                              color="orange"
                              onClick={checkoutHandler}
                              >Proceed to Checkout</Button>
                        )}
                    </Item.Extra>
                  </Item.Content>
               </Item>
            </Segment>
        </Grid.Row>
    )
}

export default Cart