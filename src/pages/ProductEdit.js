import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button,Container,Card,Input, Icon} from 'semantic-ui-react'
import {useDispatch, useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import {listProductDetails, updateProduct} from '../redux/actions/product'
import {PRODUCT_UPDATE_RESET} from '../redux/constants/product'

const ProductEdit = ({match, history}) => {
    const productId=  match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {
        loading:loadingUpdate,
        error:errorUpdate,
        success:successUpdate
    } = productUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    },[dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async(e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }

            const {data} = await axios.post('/api/upload',formData,config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = e =>{
        e.preventDefault()
        dispatch(
            updateProduct({
                _id:productId,
                name,price,image,
                brand,category,description,
                countInStock
            })
        )
    }

    return (
        <>
           <Link to='/admin/productlist'>
               Go Back
           </Link>
           <Container textAlign="justified">
               <Card centered>
                   <Card.Header as="h1">
                       Edit Product
                   </Card.Header>
                   {loadingUpdate && <Loader1/>}
                   {errorUpdate && <Message1 variant="warning">{errorUpdate}</Message1>}
                   {loading ? (
                       <Loader1/>
                   ): error ? (
                       <Message1 variant="warning">{error}</Message1>
                   ):(
                       <Form onSubmit={submitHandler}>
                           <Form.Field id="name"
                              control={Input}
                              type="text"
                              label="Name"
                              placeholder="Sample Name"
                              value={name}
                              onChange={(e)=> setName(e.target.value)}
                            />

                            <Form.Field id="price"
                               control={Input}
                               type="text"
                               label="Price"
                               placeholder="Sample Price"
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}
                            />

                            <Form.Field id="image"
                               control={Input}
                               type="text"
                               label="Image Url"
                               value={image}
                               placeholder="Url"
                               onChange={(e)=> setImage(e.target.value)}
                            />
                            <Form.Field id='image-file'
                               control={Input}
                               type="file"
                               label="Choose File"
                               onChange={uploadFileHandler}
                            />
                            {uploading && <Loader1/>}


                            <Form.Field id='brand'
                               control={Input}
                               type="text"
                               label="Brand"
                               placeholder="Sample Brand"
                               value={brand}
                               onChange={(e)=> setBrand(e.target.value)}
                            />

                            <Form.Field id="countInStock"
                               control={Input}
                               type="number"
                               label="Count In Stock"
                               placeholder="Sample Count"
                               value={countInStock}
                               onChange={(e)=> setCountInStock(e.target.value)}
                            />

                            <Form.Field id="category"
                               control={Input}
                               type="text"
                               label="Category"
                               placeholder="Sample Category"
                               value={category}
                               onChange={(e)=> setCategory(e.target.value)}
                            />


                            <Form.Field id="description"
                                control={Input}
                                type="text"
                                label="Description"
                                placeholder="Sample Description"
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}
                            />

                            <Button primary>
                                <Icon name="pencil alternate"/> Update
                            </Button>
                               
                       </Form>
                   )}
               </Card>
           </Container>
        </>
    )
}

export default ProductEdit;