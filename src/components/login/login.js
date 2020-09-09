import React, { Component } from 'react';
import { Row, Col,Input, Tooltip, Icon,message, Empty } from 'antd';
import './login.css';
import {Redirect} from 'react-router-dom';
import config from '../../config';

export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      username:"",
      password:""
      
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendForm= event =>{
    event.preventDefault();
    const {username,password} = this.state;

    if(username ==='' || password==='')
       message.error("Llene los campos");

    const server = config.API_DIR;
    fetch(`${server}/api/Users/login`, {
            method: 'POST',
            headers: {
                       'Content-Type': 'application/json'
                     },
            body: JSON.stringify(this.state)
            })
            .catch(err => this.error(err))
            .then(res => res.json())
            .then(thing => this.success(thing));
        }

  success = (msg) => {
    if(msg.error && (msg.error.statusCode >= 400 && msg.error.statusCode < 600 ))
         message.error(`Usuario y contraseña incorrectos`);
    else{
           message.success(`bienvenido ${this.state.username}`);
           localStorage.setItem('cc_nombre_usuario',this.state.username);
           const token = msg.id;
           console.log(token);
           localStorage.setItem('cc_token',token);
           setTimeout(()=>{
            window.location.href = "/vehiculos";
           },2000);
           
         }
}

  render() {
    return (
      <div className="container login-container">
            <div className="row">
                <div className="col-md-6 offset-3 login-form-1">
                    <h3>Registro Combustible</h3>
                    <form>
                        <div className="form-group">
                        <Input
                          placeholder="nombre de usuario"
                          name='username'
                          onChange={this.changeHandler}
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          
                        />
                            
                        </div>
                        <div className="form-group">
                          <Input.Password onChange={this.changeHandler} name='password' placeholder="contraseña" />
                        </div>
                        <div className="form-group">
                            <input type="submit" onClick={this.sendForm} className="btnSubmit" value="Entrar" />
                        </div>
                        
                    </form>
                </div>
                
            </div>
        </div>
    )
  }
}
