import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact';
import { BrowserRouter as Router, Route,Link,Redirect } from 'react-router-dom';
import { Tooltip,Icon,Popconfirm,Button } from 'antd';
import config from '../../config';

export default class Tabla extends Component {
  constructor(){
      super();
      this.state = {
          vehiculos:[],
          consumo_diario:[],
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


  beforeDelete(id,i){
    
    fetch(`${config.API_DIR}/api/consumo_diarios/${id}?access_token=${localStorage.getItem('cc_token')}`, {
            method: 'DELETE',
            headers: {
                       'Content-Type': 'application/json'
                     },
            body: JSON.stringify(this.state)
            })
            .catch(err => console.log(err))
            .then(thing =>{
              let consumo_diario = this.state.consumo_diario
              consumo_diario.splice(i-1, 1)
              this.setState({ consumo_diario })
            } )
  }

 
  beforeRender(consumo)
  {
    if(!consumo)
      return ''
    
    let result = this.state.vehiculos.filter(vehiculo=> vehiculo.id === consumo.customerId)    
    return result[0];    
  }

  render() {
    let i=0;
    
    const consumos = this.state.consumo_diario.map((consumo)=>
      (
        i++,        
        {
        "marca": this.beforeRender(consumo).marca,
        "modelo": this.beforeRender(consumo).modelo,    
        "combustible_inicio_estimado": consumo.combustible_inicio_estimado,
        "combustible_plan_asignado":consumo.combustible_plan_asignado,
        "combustible_habilitado": consumo.combustible_habilitado,
        "horas_trabajadas":consumo.horas_trabajadas,
        "fecha": consumo.fecha,
        "hora": consumo.hora,
        "servicentro": consumo.servicentro,
        "producto_carga": consumo.producto_carga,
        "cantidad_carga": consumo.cantidad_carga,
        "origen_carga":consumo.origen_carga ,
        "destino_carga":consumo.destino_carga ,
        "combustible_consumido":consumo.combustible_consumido ,
        "km_recorridos":consumo.km_recorridos ,
        "combustible_final":consumo.combustible_final ,
        "Acciones":
        <div>          
          <Tooltip title="Editar ">
            <Link to={`/editar_consumo/${consumo.id}`}><Icon type="edit" theme="twoTone" /></Link>
          </Tooltip>
          <br />
    
            <Icon  type="delete" theme="twoTone" />
            
              <Popconfirm
                  title="Estas seguro q desea eliminar?"
                  okText="Aceptar"
                  cancelText="Cancelar"
                  onConfirm={this.beforeDelete.bind(this, consumo.id, i)}                  
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              > 
               <a href="#" name='btn_eliminar'>Eliminar</a>
                
              </Popconfirm>                   
         </div>

        } 
      )
    );

    const data = {
        columns:[

            {
                label: 'Marca Vehículo',
                field: 'marca',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Modelo Vehículo',
                field: 'marca',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Combustible inicio estimado',
                field: 'combustible_inicio_estimado',
                 sort: 'asc',
                 width: 250
            },
            {
              label: 'Combustible plan asignado',
              field: 'combustible_plan_asignado',
              sort: 'asc',
              width: 250
            },
            {
                label: 'Combustible habilitado',
                field: 'combustible_habilitado',
                sort: 'asc',
                width: 250
            },
            {
              label: 'Horas trabajadas',
              field: 'horas_trabajadas',
              sort: 'asc',
              width: 250

            },
            {
                label: 'Fecha',
                field: 'fecha',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Hora',
                field: 'hora',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Servicentro',
                field: 'servicentro',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Producto carga',
                field: 'producto_carga',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Cantidad carga',
                field: 'cantidad_carga',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Orígen carga',
                field: 'origen_carga',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Destino carga',
                field: 'destino_carga',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Combustible consumido',
                field: 'combustible_consumido',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Km recorridos',
                field: 'km_recorridos',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Combustible final',
                field: 'combustible_final',
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
      
       rows: consumos
    };  

    return (
      
      <div>
        <h3>Consumo diario</h3>
        
        <MDBDataTable responsive
          striped
          bordered
          hover
          data={data}
        />
        
      </div>
    )
  }
}

