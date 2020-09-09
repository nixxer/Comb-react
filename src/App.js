import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import './bootstrap4.css';

import AppNavbar from './components/AppNavbar';
import Login from './components/login/login';
import Vehiculos from './components/vehiculos/tabla';
  import form_nuevo_vehiculo from './components/vehiculos/form.js';
  import form_editar_vehiculo from './components/vehiculos/form_editar.js';
import Consumo_diario from './components/consumo_diario/tabla';
  import form_nuevo_consumo from './components/consumo_diario/form.js';
  import form_editar_consumo from './components/consumo_diario/form_editar';

import { Container } from 'mdbreact';
import Asignar_consumo from './components/consumo_diario/asignar_consumo';

class App extends Component {
  constructor(){
    super();
    this.state = {
      logged:false
    };
  }
  componentDidMount(){
    const user = localStorage.getItem('cc_nombre_usuario');
    const token = localStorage.getItem('cc_token');
    
    //check 
    if(user && token)                 
      this.setState({logged:true});    
    else
      this.setState({logged:false });
  }

  render() {    
    if(!this.state.logged)
      return(
        <BrowserRouter>
          <div className="App">
          <Container>
              <Route path="/" component={Login} />
          </Container>
          </div>
        </BrowserRouter>    
      );

    else
      return(
        <BrowserRouter>
         <div className="App">           
          <AppNavbar />         
            <Container>
              <Route  exact path="/" component={Vehiculos} />
              <Route  exact path="/vehiculos" component={Vehiculos} />
              <Route path="/vehiculos/nuevo_vehiculo" component={form_nuevo_vehiculo} />
              <Route path="/vehiculos/editar_vehiculo/:id" component={form_editar_vehiculo} /> 
              <Route path="/consumo_diario" component={Consumo_diario} />
              <Route path="/nuevo_consumo/:id" component={form_nuevo_consumo} />
              <Route path="/asignar_consumo/:id" component={Asignar_consumo} />
              <Route path="/editar_consumo/:id" component={form_editar_consumo} />
            </Container>        
         </div>
        </BrowserRouter>    
      );
  }
}

export default App;

