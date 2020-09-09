import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';

class AppNavbar extends Component {
    constructor(){
        super();
        
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout = ()=>{
            fetch('/api/Users/logout',{
                method: 'POST',
                headers: {
                            'Content-Type':'application/json'
                        },
                body:""
            })
            .catch(err => this.error(err))
            .then(res => res.json())
            .then(res => {
                
                localStorage.clear();
                window.location.href='/login';
            });            
    }

    render() {
        
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                  1st menu item
                </a>
              </Menu.Item>
              <Menu.Item key="1">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                  2nd menu item
                </a>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item key="3" disabled>
                3rd menu item（disabled）
              </Menu.Item>
            </Menu>
          );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="#">
                            Consumo Combustible
                    </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto">
                               
                                <NavItem>
                                    <NavLink ><Link to="/vehiculos">Vehículos </Link></NavLink>                                    
                                </NavItem>
                                <NavItem>
                                    <NavLink ><Link to="/consumo_diario">Consumo Diario </Link></NavLink>
                                </NavItem>     
                                <NavItem>
                                     <NavLink ><Link onClick={this.logout} to='/login'>Salir</Link></NavLink>
                                </NavItem> 
                            </Nav>
                        </Collapse>
                    </Container>

                </Navbar>
            </div>
        )
    }

}

export default AppNavbar;