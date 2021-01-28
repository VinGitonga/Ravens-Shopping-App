import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Grid,Card,Button,Item,Icon,Message,Segment,Select,Form as Form1,TextArea} from  'semantic-ui-react'
import {Form,Alert} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
//import Meta from '../components/Meta'
import {
    listProductDetails,
    createProductReview
} from '../redux/actions/product'

import {PRODUCT_CREATE_REVIEW_RESET} from '../redux/constants/product'

const Product = ({history, match})=>{
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [show,setShow] = useState(true) 

    const dispatch = useDispatch()

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state=> state.productReviewCreate)
    const {
        success:successProductReview,
        loading:loadingProductReview,
        error:errorProductReview
    } = productReviewCreate

    useEffect(()=>{
        if(successProductReview){
            setRating(0)
            setComment('')
        }

        if(!product._id || product._id !== match.params.id){
            dispatch(listProductDetails(match.params.id))
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
    },[dispatch,match,successProductReview,product._id])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const handleDismiss = () =>{
      setShow(false)
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(
            createProductReview(match.params.id,{
                rating,comment
            })
        )
    }


    const ratingOpts = [
       {key:'1',value:1, text:'Poor' },
       {key:'2',value:2,text:'Fair' },
       {key:'3',value:3,text:'Good' },
       {key:'4',value:4,text:'Very Good'},
       {key:'5',value:5,text:'Excellent'}
    ]

    const stl = {width:400,height:275}

    return (
        <>
           <Link to='/'>
               Go Back
           </Link>
           {loading ? (
               <Loader1/>
           ): error ? (
               <Message1 variant="warning">{error}</Message1>
           ):(
               <>
                  {/*<Meta title={product.name}/>*/}
                    <Grid.Row>
                      <Item.Group relaxed>
                         <Item>
                           <Item.Image size="large" src={product.image} circular/>
                           <Item.Content verticalAlign="top">
                             <Item.Header>{product.name}</Item.Header>

                             <Item.Description>
                                   <Rating value={product.rating}
                                      text={`${product.numReviews} reviews`}/>
                              </Item.Description>
                              <br/>
                              <br/>
                              <Item.Header as="h1">Price</Item.Header>
                              <Item.Description as="h2" style={{color:'olive'}}>$ {product.price}</Item.Description>
                              <br/>
                              <Item.Header as="h1">Status: </Item.Header>
                              <Item.Description as="h2" style={{color:'teal'}} >
                                 {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                              </Item.Description>
                              <Item.Header as="h1">Description</Item.Header>
                              <Item.Description> {product.description} </Item.Description>
                              <br/>
                              <Item.Header as="h2">Qty</Item.Header>
                              <Item.Description as="h3">
                                 <Form.Control
                                     as='select'
                                     value={qty}
                                     onChange={(e)=> setQty(e.target.value)}>
                                         {[...Array(product.countInStock).keys()].map(
                                             (x)=>(
                                                 <option key={x+1} value={x+1}>
                                                     {x+1}
                                                 </option>
                                             )
                                         )}
                                     </Form.Control>
                                     <br/>
                                     <br/>
                                     <Item.Description>
                                        {product.countInStock === 0 ? (
                                          <Button color="teal" disabled>
                                              <Icon name="cart"/> Add To Cart
                                          </Button>
                                      ):(
                                          <Button color="teal" onClick={addToCartHandler}>
                                              <Icon name="cart"/>Add To Cart
                                          </Button>
                                      )}
                                     </Item.Description>
                              </Item.Description>
                           </Item.Content>
                         </Item>
                      </Item.Group>
                    </Grid.Row>
                  <br/>
                  <br/>

                  <div style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
                       {product.reviews.length === 0 && (
                            <>
                               
                               <Alert variant="danger" show={show}>
                                  <Alert.Heading as="h2">
                                      <Icon  name="exclamation triangle"/> Reviews
                                  </Alert.Heading>
                                  <p>No reviews</p>
                                  <Button size="small"  onClick={()=> setShow(false)} primary>x</Button>
                               </Alert>
                            </>
                        )}

                        <Message
                           info
                           attached
                           header="Write a review"
                           icon="edit"/>
                  </div>
                  <br/>
                  <div style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
                      {loadingProductReview && <Loader1 />}
                      {errorProductReview && (
                         <Message negative style={{width:410}} onDismiss={handleDismiss} >{errorProductReview}</Message>
                      )}
                  </div>
                  {userInfo ? (
                    <Card centered style={stl}>
                    <Form1 onSubmit={submitHandler}>
                       <Segment>
                           <Form1.Group widths="equal">
                              <Form1.Field
                                 control={Select}
                                 label="Rating"
                                 options={ratingOpts}
                                 placeholder="Choose ..."
                                 value={rating}
                                 onChange={(e) => setRating(e.target.value)}
                              />
                              <Form1.Field
                                 control={TextArea}
                                 label="Comment"
                                 placeholder="Comment on the product"
                                 value={comment}
                                 onChange={(e)=> setComment(e.target.value)}/>
                           </Form1.Group>

                           {loadingProductReview ? (
                               <Button disabled primary>Submit</Button>
                            ):(

                               <Button primary>Submit</Button>
                            )}
                       </Segment>
                    </Form1>
                    </Card>
                  ):(
                     <Message info>Please <Link to="/login">Sign In</Link> to write a reviews{' '}</Message>
                  )}
               </>
           )}
        </>
    )
}

export default Product
