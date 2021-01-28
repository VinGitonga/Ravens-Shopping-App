import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Container,Card} from 'semantic-ui-react'
import Product from '../components/Product'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import ProductCarousel from "../components/ProductCarousel";
import {listProducts} from '../redux/actions/product'

const Home = ({match}) =>{
    const keyword = match.params.keyword

    const  pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)

    const {loading, error, products, page, pages} = productList;

    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch,keyword,pageNumber])

    return (
        <>
           <Meta/>
           {!keyword ? (
               <ProductCarousel />
           ):(
               <Link to='/'>
                   Go Back
               </Link>
           )}
           <h1 style={{textAlign:'center',alignItems:'center'}} >Latest Products</h1>
           <br/>
           {loading ? (
               <Loader1 />
           ): error ? (
               <Message1 variant='warning'>{error}</Message1>
           ):(
               <Container textAlign="justified"> 
                  <Card.Group stackable centered itemsPerRow={3} >
                     <>
                       {products.map((product)=>(
                           <Product product={product}/>
                        ))}
                     </>
                  </Card.Group>
                  <Paginate
                     pages={pages}
                     page={page}
                     keyword={keyword ? keyword : ''}/>
               </Container>
           )}
        </>
    )
}

export default Home
