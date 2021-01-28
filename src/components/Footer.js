import React from 'react'
import {Container,Grid} from 'semantic-ui-react'

const Footer = () =>{
    return (
        <footer>
            <Container justified>
                <Grid textAlign="center" columns={1}>
                    <Grid.Row>
                        <Grid.Column>Copyright &copy; Ravens</Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </footer>
    )
}

export default Footer