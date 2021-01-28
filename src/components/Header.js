import React from 'react'
import {Route } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {Menu,Icon,Dropdown,Container} from 'semantic-ui-react'
import SearchBox from './SearchBox'
import {logout} from '../redux/actions/user'

const Header = () =>{
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () =>{
        dispatch(logout())
    }

    return (
      <Menu stackable fluid id='menu' inverted>
          <Container  style={{justifyContent:'space-between'}}>
              <LinkContainer to='/'>
                  <Menu.Item header>
                     Ravens
                  </Menu.Item>
              </LinkContainer>

              <Menu.Item>
                  <Route render={({history})=> <SearchBox history={history}/>}/>
              </Menu.Item>

              <LinkContainer to='/cart'>
                 <Menu.Item header>
                     <Icon name="shopping cart" size="large"/>
                     Cart
                  </Menu.Item>
              </LinkContainer>

              <Menu.Menu>
                  {userInfo ? (
                    <Dropdown item text={userInfo.name}>
                        <Dropdown.Menu>
                            <LinkContainer to='/profile'>
                                <Menu.Item>
                                     <Icon name="user" color="black">
                                        {'  '}Profile
                                    </Icon>
                                </Menu.Item>
                            </LinkContainer>
                            <Dropdown.Item onClick={logoutHandler}>
                                <Icon name="power">
                                   {'  '}Logout
                                </Icon>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                  ):(
                    <LinkContainer to='/login'>
                        <Menu.Item header>
                            <Icon name="user circle outline" size="large"/>
                               Log In
                        </Menu.Item>
                    </LinkContainer>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <Dropdown item text='Admin'>
                        <Dropdown.Menu>
                            <LinkContainer to='/admin/userlist'>
                                <Menu.Item>
                                    <Icon name="users" color="black">
                                       {'  '}Users
                                    </Icon>
                                </Menu.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/productlist'>
                                <Menu.Item>
                                    <Icon name="warehouse" color="black">
                                        {'  '}Products
                                    </Icon>
                                </Menu.Item>
                            </LinkContainer>
                            <LinkContainer to='/admin/orderlist'>
                                <Menu.Item>
                                    <Icon name="truck">
                                       {'  '}Orders
                                    </Icon>
                                </Menu.Item>
                            </LinkContainer>
                        </Dropdown.Menu>
                    </Dropdown>
                  )}
              </Menu.Menu>

          </Container>
      </Menu>
    )
}

export default Header;
