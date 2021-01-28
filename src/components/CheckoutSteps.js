import React from 'react'
import { Icon, Step } from "semantic-ui-react";
import {LinkContainer} from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) =>{
    return(
        <>
           <Step.Group attached="top">
               {step1 ? (
                   <Step>
                       <Icon name="user circle outline"/>
                       <LinkContainer to='/login'>
                           <>
                             <Step.Title>Sign In</Step.Title>
                             <Step.Description>Please log in proceed to checkout</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               ):(
                   <Step disabled>
                       <Icon name="user circle outline"/>
                       <LinkContainer to='/login'>
                           <>
                             <Step.Title>Sign In</Step.Title>
                             <Step.Description>Please log in proceed to checkout</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               )}

               {step2 ? (
                   <Step>
                       <Icon name="shipping"/>
                       <LinkContainer to='/shipping'>
                           <>
                             <Step.Title>Shipping</Step.Title>
                             <Step.Description>Shipment haha</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               ):(
                   <Step  disabled>
                       <Icon name="shipping"/>
                       <LinkContainer to='/shipping'>
                           <>
                             <Step.Title>Shipping</Step.Title>
                             <Step.Description>Shipment haha</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               )}

               {step3 ? (
                   <Step>
                       <Icon name="credit card"/>
                       <LinkContainer to='/payment'>
                           <>
                             <Step.Title>Payment</Step.Title>
                             <Step.Description>Proceed to payment</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               ):(
                   <Step disabled>
                       <Icon name="credit card"/>
                       <LinkContainer to='/payment'>
                           <>
                             <Step.Title>Payment</Step.Title>
                             <Step.Description>Proceed to payment</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               )}

               {step4 ? (
                   <Step>
                       <Icon name="info circle"/>
                       <LinkContainer to='/placeorder'>
                           <>
                             <Step.Title>Place Order</Step.Title>
                             <Step.Description>Now place the order</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               ):(
                   <Step disabled>
                       <Icon name="info circle"/>
                       <LinkContainer to='/placeorder'>
                           <>
                             <Step.Title>Place Order</Step.Title>
                             <Step.Description>Now place the order</Step.Description>
                           </>
                       </LinkContainer>
                   </Step>
               )}
           </Step.Group>
        </>
    )
}

export default CheckoutSteps;
