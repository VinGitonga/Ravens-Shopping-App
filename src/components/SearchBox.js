import React ,{useState} from 'react'
import {Form,Button,Input,Icon} from 'semantic-ui-react'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inverted>
            <Form.Field inline
               control={Input}
               type="text"
               name='q'
               onChange={(e)=> setKeyword(e.target.value)}
               placeholder='Search Products...'/>

            <Button type='submit' primary icon>
                <Icon name="search"/>
            </Button>
        </Form>
    )
}

export default SearchBox;