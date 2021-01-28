import React from 'react'
import {Link} from 'react-router-dom'
import {Card,Image} from 'semantic-ui-react'
import Rating from './Rating'

const Product = ({product}) =>{
    return (
        <Card style={{marginBottom:'40px',padding:'10px',border:'none'}}>
            <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} wrapped ui={true} circular/>
            </Link>
            <Card.Content>
               <Link to={`/product/${product._id}`}>
                   <Card.Header style={{fontSize:'1rem'}} >{product.name}</Card.Header>
                </Link>
               <Card.Meta>
                 <Rating value={product.rating}
                    text={`${product.numReviews} reviews`}/>
              </Card.Meta>
              <Card.Description style={{color:'olive'}} as="h3">
                $ {product.price}
              </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Product