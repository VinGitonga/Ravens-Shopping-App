import React from 'react'
import {Message} from 'semantic-ui-react'

const Message1 = ({variant, children}) =>{
    return (
        <Message {...variant}>
            <Message.Header>{children}</Message.Header>
        </Message>
    )
}

Message1.defaultProps = {
    variant:'success'
}

export default Message1;