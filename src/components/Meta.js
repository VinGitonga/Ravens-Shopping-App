import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) =>{
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name='keyword' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'Welcome to Ravens',
    description:'We sell the best products at a favourable price',
    keywords:'electronics, stuff'
}

export default Meta;