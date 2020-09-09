import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";
import { message,Button } from 'antd';

import config from '../../config';


class form extends React.Component {
  constructor(){
    super();
    this.state = {
     marca: "",
     modelo: "",
     matricula: "",
     numero_tarjeta: "",
     capacidad_carga: "",
     indice_consumo: ""
   };
  }
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    //console.log(this.state);
  };

  sendForm = e =>{
      e.preventDefault();

      fetch(`${config.API_DIR}/api/vehiculos?access_token=${localStorage.getItem('cc_token')}`, {
            method: 'PUT',
            headers: {
                       'Content-Type': 'application/json'
                     },
            body: JSON.stringify(this.state)
            })
            .catch(err => this.error(err))
            .then(res => res.json())
            .then(thing => this.success(thing));
            
  }

   // mensaje notificacion
   success = (msg) => {
    if(msg.error && (msg.error.statusCode >= 400 && msg.error.statusCode < 600 ))
         message.error(`No se ha podido editar el vehículo ${this.state.marca}`);
    else{
          message.success(`El vehículo ${this.state.marca} se ha editado con exito`);
          setTimeout(()=>{
            window.location.href = "/vehiculos";
          },2000);
         }
   
  }


  componentDidMount() {
   let id = this.props.match.params.id;
    fetch(`${config.API_DIR}/api/vehiculos/${id}?access_token=${localStorage.getItem('cc_token')}`)
      .then(res => res.json())
      .then(vehiculos => this.setState({ ...vehiculos }, () => console.log('vehiculos fetched...', vehiculos)));
  }


  render() {
    return (
      <div>
          <h3> Editar vehículo</h3>
        <form>
          <MDBRow>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterNameEx"
                className="grey-text"
              >
                Marca
              </label>
              <input
                value={this.state.marca}
                name="marca"
                onChange={this.changeHandler}
                type="text"
                id="defaultFormRegisterNameEx"
                className="form-control"
                placeholder="marca"
                required
              />
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterEmailEx2"
                className="grey-text"
              >
                Modelo
              </label>
              <input
                value={this.state.modelo}
                name="modelo"
                onChange={this.changeHandler}
                type="text"
                id=""
                className="form-control"
                placeholder="modelo"
                required
              />
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterConfirmEx3"
                className="grey-text"
              >
                Matrícula
              </label>
              <input
                value={this.state.matricula}
                onChange={this.changeHandler}
                type="matricula"
                id=""
                className="form-control"
                name="matricula"
                placeholder="matrícula"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterPasswordEx4"
                className="grey-text"
              >
                Número de Tarjeta
              </label>
              <input
                value={this.state.numero_tarjeta}
                onChange={this.changeHandler}
                type="text"
                id="defaultFormRegisterPasswordEx4"
                className="form-control"
                name="numero_tarjeta"
                placeholder="número de tarjeta"
                required
              />
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterPasswordEx4"
                className="grey-text"
              >
                Capacidad carga
              </label>
              <input
                value={this.state.capacidad_carga}
                onChange={this.changeHandler}
                type="text"
                id="defaultFormRegisterPasswordEx4"
                className="form-control"
                name="capacidad_carga"
                placeholder="capacidad carga"
                required
              />
            </MDBCol>
            <MDBCol md="4" className="mb-3">
              <label
                htmlFor="defaultFormRegisterPasswordEx4"
                className="grey-text"
              >
                Indice consumo
              </label>
              <input
                value={this.state.indice_consumo}
                onChange={this.changeHandler}
                type="text"
                id=""
                className="form-control"
                name="indice_consumo"
                placeholder="índice consumo"
                required
              />
            </MDBCol>
          </MDBRow>
         
         
          <Button onClick={this.sendForm} type="primary">Editar</Button>
          <Button href='/vehiculos'>Atras</Button>
        </form>
      </div>
    );
  }
  
}

export default form;