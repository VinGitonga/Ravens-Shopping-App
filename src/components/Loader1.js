import React from 'react'
import {Dimmer, Loader} from 'semantic-ui-react'

const Loader1 = () =>{
    return (
        <Dimmer active inverted>
            <Loader inverted inline= "centered" size="medium" >Loading ...</Loader>
        </Dimmer>
    )
}

export default Loader1