import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Grid,Icon} from 'semantic-ui-react'
import {useDispatch,useSelector} from 'react-redux'
import Message1 from '../components/Message1'
import Loader1 from '../components/Loader1'
import Paginate from '../components/Paginate'
import {
    listProducts,
    deleteProduct,
    createProduct
} from '../redux/actions/product'
import {PRODUCT_CREATE_RESET} from '../redux/constants/product'

const ProductList = ({history, match})=>{
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state=> state.productList)
    const {loading, error, products, page,pages} = productList

    const productDelete = useSelector(state=> state.productDelete)
    const {
        loading:loadingDelete,
        error:errorDelete,
        success:successDelete
    } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {
        loading:loadingCreate,
        error:errorCreate,
        success:successCreate,
        product:createdProduct
    } = productCreate

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if(!userInfo || !userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
    },[
        dispatch,history,userInfo,successDelete,successCreate,createdProduct,pageNumber
    ])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
    }

    return (
        <>
           <Grid.Row>
               <Grid.Column textAlign="center">
                   <h1>Products</h1>
               </Grid.Column>
               <Grid.Column textAlign="right">
                   <Button color="olive" onClick={createProductHandler} icon>
                       <Icon name="plus circle"/>Create Product
                   </Button>
               </Grid.Column>
           </Grid.Row>
           {loadingDelete && <Loader1/>}
           {errorDelete && <Message1 variant="warning">{errorDelete}</Message1>}
           {loadingCreate && <Loader1/>}
           {errorCreate && <Message1 variant="warning">{errorCreate}</Message1> }
           {loading ? (
               <Loader1/>
           ): error ? (
               <Message1 variant="warning">{error}</Message1>
           ):(
               <>
                  <Table singleLine>
                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>ID</Table.HeaderCell>
                              <Table.HeaderCell>NAME</Table.HeaderCell>
                              <Table.HeaderCell>PRICE</Table.HeaderCell>
                              <Table.HeaderCell>CATEGORY</Table.HeaderCell>
                              <Table.HeaderCell>BRAND</Table.HeaderCell>
                              <Table.HeaderCell>Action</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                      <Table.Body>
                          {products.map((product)=>(
                              <Table.Row key={product._id}>
                                  <Table.Cell>{product._id}</Table.Cell>
                                  <Table.Cell>{product.name}</Table.Cell>
                                  <Table.Cell>{product.price}</Table.Cell>
                                  <Table.Cell>{product.category}</Table.Cell>
                                  <Table.Cell>{product.brand}</Table.Cell>
                                  <Table.Cell>
                                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                          <Button color="teal" size="small" icon>
                                              <Icon name="pencil"/>
                                          </Button>
                                      </LinkContainer>
                                      <Button negative size="small" icon
                                        onClick={()=> deleteHandler(product._id)}>
                                            <Icon name="trash alternate"/>
                                        </Button>
                                  </Table.Cell>
                              </Table.Row>
                          ))}
                      </Table.Body>
                  </Table>
                  <Paginate pages={pages} page={page} isAdmin={true}/>
               </>
           )}
        </>
    )
}

export default ProductList