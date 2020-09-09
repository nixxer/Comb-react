import React, { Component } from 'react';
//import './customers.css';
import { Table } from 'reactstrap';


class Customers extends Component {
  constructor() {
    super();
    this.state = {
      vehiculos: [],
      consumo_diario: []
    };
    
  }

  componentDidMount() {
    fetch('/api/vehiculos')
      .then(res => res.json())
      .then(vehiculos => this.setState({ vehiculos }, () => console.log('vehiculos fetched...', vehiculos)));

    fetch('/api/consumo_diarios')
      .then(res => res.json())
      .then(consumo_diario => this.setState({ consumo_diario }, () => console.log('consumo_diario fetched...', consumo_diario)));
  }
  
  render() {
    var i = 1;
    return (
      <div>
        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Matrícula</th>
            <th>Número Tarjeta</th>
            <th>Capacidad Carga</th>
            <th>Indice Consumo</th>
          </tr>
        </thead>
        <tbody>
           
          {this.state.vehiculos.map(vehiculo =>
            <tr> 
               <td>{ i++ }</td> 
               <td>{vehiculo.marca}</td>
               <td>{vehiculo.modelo}</td>
               <td>{vehiculo.matricula}</td>
               <td>{vehiculo.numero_tarjeta}</td>
               <td>{vehiculo.capacidad_carga}</td>
               <td>{vehiculo.indice_consumo}</td>   
            </tr>
            )} 
          
        </tbody>
      </Table>
      </div>
    );
  }
}

export default Customers;
