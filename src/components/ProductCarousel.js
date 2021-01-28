import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Carousel} from 'react-bootstrap'
import {Image} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
import Loader1 from './Loader1'
import '../bootstrap.min.css'
//import Message1 from './Message1'
import {listTopProducts} from '../redux/actions/product'
import Message1 from './Message1'

const ProductCarousel = () =>{
    const dispatch= useDispatch()

    const productTopRated = useSelector((state)=> state.productTopRated)
    const {loading,error, products} = productTopRated;

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    return loading ? (
        <Loader1/>
    ): error ? (
        <Message1 variant="warning">{error}</Message1>
    ): (
        <Carousel pause='hover' className="bg-dark">
            {products.map((product)=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} size="large" circular wrapped ui={true}/>
                        <Carousel.Caption className="carousel-caption">
                            <h2>
                                {product.name} (${product.price})
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel