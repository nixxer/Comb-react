import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom';
import { message,Tooltip,Icon,Popconfirm,Button } from 'antd';
import { log } from 'util';
import { Row, Col } from 'antd';
import config from '../../config';




export default class Tabla extends Component {
  constructor(){
      super();
      this.state = {
          vehiculos:[],
          consumo_diario:[],
          token:'',
          visible:false
      };
  }  

  componentDidMount() {
  
    
    fetch(`${config.API_DIR}/api/vehiculos?access_token=${localStorage.getItem('cc_token')}`)
      .then(res => res.json())
      .then(vehiculos => this.setState({ vehiculos }, () => console.log('vehiculos fetched...', vehiculos)));

    fetch(`${config.API_DIR}/api/consumo_diarios?access_token=${localStorage.getItem('cc_token')}`)
      .then(res => res.json())
      .then(consumo_diario => this.setState({ consumo_diario }, () => console.log('consumo_diario fetched...', consumo_diario)));
  }

  //confirm eliminar
  handleOk(id) {
    console.log(id);
    //alert(document.getElementById('btn_eliminar').name);
   // alert(id);
  };

  beforeDelete(id,i){
    const consumo = this.state.consumo_diario.filter(consumo=> consumo.customerId === id);
    if(consumo.length >= 1)
      {
        message.error("Antes de eliminar el vehículo elimine sus consumo");
        return;
      }

    
    fetch(`${config.API_DIR}/api/vehiculos/${id}?access_token=${localStorage.getItem('cc_token')}`, {
            method: 'DELETE',
            headers: {
                       'Content-Type': 'application/json'
                     },
            body: JSON.stringify(this.state)
            })
            .catch(err => console.log(err))
            .then(thing =>{
              let vehiculos = this.state.vehiculos;
              vehiculos.splice(i-1, 1);
              this.setState({ vehiculos });
              message.success("Se elimino el vehículo correctamente");
            } )
  }

  render() {
    
    let i=0;
    const vehiculos = this.state.vehiculos.map((vehiculo)=>
      (
        i++,
        {
        "marca": vehiculo.marca,
        "modelo": vehiculo.modelo,
        "matricula": vehiculo.matricula,
        "numero_tarjeta": vehiculo.numero_tarjeta,
        "capacaidad_carga": vehiculo.capacidad_carga,
        "indice_consumo": vehiculo.indice_consumo,
        "acciones":
        <div>
          <Tooltip title="Asignar consumo ">
            <Link to={`/asignar_consumo/${vehiculo.id}`}><Icon type="file-text" theme="twoTone" /></Link>
          </Tooltip>
          <Tooltip title="Editar ">
            <Link to={`/vehiculos/editar_vehiculo/${vehiculo.id}`}><Icon type="edit" theme="twoTone" /></Link>
          </Tooltip>
    
            <Icon  type="delete" theme="twoTone" />
            
              <Popconfirm
                  title="Estas seguro q desea eliminar?"
                  okText="Aceptar"
                  cancelText="Cancelar"
                  onConfirm={this.beforeDelete.bind(this, vehiculo.id, i)}
                  
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
               > 
                  <a href="#" name='btn_eliminar'>Eliminar</a>
                
              </Popconfirm>
                   
        </div>

        } 
      )
    );
    //console.log("el array result tiene:");
    //console.log(result);

    const data = {
        columns:[
            
            {
                label: 'Marca',
                field: 'marca',
                 sort: 'asc',
                 width: 250
            },
            {
                label: 'Modelo',
                field: 'modelo',
                sort: 'asc',
                width: 250
            },
            {
                label: 'Matrícula',
                field: 'matricula',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Número de tarjeta',
                field: 'numero_tarjeta',
                sort: 'asc',
                width: 150
               },
               {
                   label: 'Capacidad Carga',
                   field: 'capacidad_carga',
                   sort: 'asc',
                   width: 100
               },
               {
                label: 'Indice consumo',
                field: 'indice_consumo',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Acciones',
                field: 'acciones',
                sort: 'asc',
                width: 100
              }               
        ],
      //  rows:this.state.vehiculos 
       rows: vehiculos
    };  

    return (
      
      <div>
        <h3>Vehículos</h3>
        <MDBDataTable responsive
          striped
          bordered
          hover
          data={data}
        />
        <Row >
        <Col span={12} push={16}>
          <Button style={{"marginBottom":"30px"}} type="primary" href="/vehiculos/nuevo_vehiculo" icon="file-add" >Nuevo Vehículo</Button>
         </Col>
        </Row>  
      </div>
    )
  }
}
// ID: {this.props.match.params.id}
// <Button style={{"backgroundColor":"#4c7a9b"}}><Link to='/vehiculos/nuevo'>Nuevo Vehículo</Link></Button>
