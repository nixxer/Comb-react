import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBBtn, Table } from "mdbreact";
import { message,Row, Col,Button,DatePicker,TimePicker,Form } from 'antd';
import moment from 'moment';
import config from '../../config';


export default class form_consumo extends Component {
    constructor(){
        super();
        this.state = {
            combustible_inicio_estimado: "",
            combustible_habilitado: "",
            combustible_plan_asignado:"",
            fecha: "",
            hora: "",
            servicentro: "",
            producto_carga: "",
            cantidad_carga: "",
            origen_carga:"" ,
            destino_carga:"" ,
            combustible_consumido:"" ,
            km_recorridos:"" ,
            combustible_final:""
       };
      }

      componentDidMount() {
          let id = this.props.match.params.id;
          fetch(`${config.API_DIR}/api/consumo_diarios/${id}?access_token=${localStorage.getItem('cc_token')}`)
          .then(res => res.json())
          .then(consumo => this.setState({...consumo}, ()=>console.log("consumo fetched...",consumo)));
          
        } 
        
        changeHandler = event => {
            this.setState({ [event.target.name]: event.target.value });
        };

      
        
        sendForm = e =>{
            e.preventDefault();

            const comb_ini = parseInt(this.state.combustible_inicio_estimado);
            const comb_hab = parseInt(this.state.combustible_habilitado);
            const comb_con = parseInt(this.state.combustible_consumido);

            const combustible_final = comb_ini + comb_hab - comb_con;
            const data = this.state;

            if(!combustible_final)
            {
                message.error(`Corrija los valores del consumo`);
                return false;
            }
            else{
                var input_combustible_final = document.getElementsByName("combustible_final")[0];
                input_combustible_final.value = combustible_final;
                data['combustible_final'] = combustible_final;
            }

            let id = this.props.match.params.id;
            fetch(`${config.API_DIR}/api/consumo_diarios/${id}?access_token=${localStorage.getItem('cc_token')}`, {
                method: 'PUT',
                headers: {
                            'Content-Type': 'application/json'
                        },
                body: JSON.stringify(data)
                })
                .catch(err => this.error(err))
                .then(res => res.json())
                .then(thing => this.success(thing))
        }

  // mensaje notificacion
  success = (msg) => {
    if(msg.error && (msg.error.statusCode >= 400 && msg.error.statusCode < 600 ))
         message.error(`No se ha podido modificar el consumo diario`);
    else{  
           message.success(`El consumo diario se ha modificado con exito`);
           setTimeout(()=>{
            window.history.back();
           },2000);
           
         }
    }
    
    onDateChange = (date, dateString)=> {
        this.setState({ fecha:dateString});
    }
    
    onTimeChange = (time,timeString) => {
        this.setState({ hora: timeString });
    };

    goBack = ()=>{
        window.history.back();
    }

    onKeyUp = e =>{
       // alert(e.target.value);
        
    }

    render() {
        let id_vehiculo = this.props.match.params.id;
        const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
        const format = 'HH:mm';
        
        var dateText= this.state.fecha;
        var dateObject = moment(dateText,format);

        var time = "15:30";
        var time_formatted = moment(this.state.hora, "HH:mm");
        console.log('la hora es:');
        console.log(this.state.hora);


        return (
            <div>
                <h3 > Editar Consumo Diario</h3>
                <form>
                <MDBRow style={{"marginBottom":"10px"}}>
                    <MDBCol md="3" className="offset-2">
                        <label
                            htmlFor="defaultFormRegisterConfirmEx3"
                            className="grey-text"
                        >
                            Fecha
                        </label>
                        <br />
                        <DatePicker value={dateObject} onChange={this.onDateChange} />
                        
                    </MDBCol>
                    <MDBCol md="3" className="offset-2">
                        <label
                            htmlFor="defaultFormRegisterEmailEx2"
                            className="grey-text"
                        >
                         Hora
                        </label>
                        <br />
                        <TimePicker defaultValue={moment('14:14', format)} format={format} 
                        onChange={this.onTimeChange} />
                     </MDBCol>

                    
                </MDBRow>
                <MDBRow>

                   <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterNameEx"
                        className="grey-text"
                    >
                        Combustible Inicio Estimado
                    </label>
                    <input
                        value={this.state.combustible_inicio_estimado}
                        name="combustible_inicio_estimado"
                        onChange={this.changeHandler}
                        onKeyUp={this.onKeyUp}
                        type="text"
                        id=""
                        className="form-control"
                        placeholder="Combustible Inicio Estimado"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterEmailEx2"
                        className="grey-text"
                    >
                        Combustible Habilitado
                    </label>
                    <input
                        value={this.state.combustible_habilitado}
                        name="combustible_habilitado"
                        onChange={this.changeHandler}
                        onKeyUp={this.onKeyUp}
                        type="text"
                        id=""
                        className="form-control"
                        placeholder="Combustible Habilitado"
                        
                    />
                      
                    </MDBCol> 
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Combustible Plan Asignado
                    </label>
                    <input
                        value={this.state.combustible_plan_asignado}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="combustible_plan_asignado"
                        placeholder="Combustible Plan Asignado"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Horas Trabajadas
                    </label>
                    <input
                        value={this.state.horas_trabajadas}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="horas_trabajadas"
                        placeholder="Horas Trabajadas"
                        
                    />
                    </MDBCol>                 
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Servicentro
                    </label>
                    <input
                        value={this.state.servicentro}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="servicentro"
                        placeholder="Servicentro"
                        
                    />
                    </MDBCol>

                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Producto Carga
                    </label>
                    <input
                        value={this.state.producto_carga}
                        onChange={this.changeHandler}
                        type="text"
                        id="defaultFormRegisterPasswordEx4"
                        className="form-control"
                        name="producto_carga"
                        placeholder="Producto Carga"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Cantidad Carga
                    </label>
                    <input
                        value={this.state.cantidad_carga}
                        onChange={this.changeHandler}
                        type="text"
                        id=""
                        className="form-control"
                        name="cantidad_carga"
                        placeholder="Cantidad Carga"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Orígen carga
                    </label>
                    <input
                        value={this.state.origen_carga}
                        onChange={this.changeHandler}
                        type="text"
                        id=""
                        className="form-control"
                        name="origen_carga"
                        placeholder="Orígen carga"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Destino Carga
                    </label>
                    <input
                        value={this.state.destino_carga}
                        onChange={this.changeHandler}
                        type="text"
                        id=""
                        className="form-control"
                        name="destino_carga"
                        placeholder="Destino Carga"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Combustible Consumido
                    </label>
                    <input
                        value={this.state.combustible_consumido}
                        onChange={this.changeHandler}
                        type="text"
                        id=""
                        className="form-control"
                        name="combustible_consumido"
                        placeholder="Combustible Consumido"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Km Recorridos
                    </label>
                    <input
                        value={this.state.km_recorridos}
                        onChange={this.changeHandler}
                        type="text"
                        id=""
                        className="form-control"
                        name="km_recorridos"
                        placeholder="Km Recorridos"
                        
                    />
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                    <label
                        htmlFor="defaultFormRegisterPasswordEx4"
                        className="grey-text"
                    >
                        Combustible Final
                    </label>
                    <input
                        value={this.state.combustible_final}
                        
                        type="text"
                        id=""
                        className="form-control"
                        name="combustible_final"
                        placeholder="Combustible Final"
                        disabled
                    />
                    </MDBCol>
                </MDBRow>
                    <div >
                        <Button  style={{"margin":"10px"}} onClick={this.sendForm} type="primary">Modificar</Button>
                        <Button  onClick={this.goBack} >Atras</Button>
                    </div>
                </form>
              
            </div>
        )
    }
}
