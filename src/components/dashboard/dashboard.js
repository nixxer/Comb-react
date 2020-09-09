import React, { Component } from 'react'

export default class Dashboard extends Component {
    constructor(){
        super();
        
    }

    render() {

       const user = this.props.user;
        //this.props.user = 'admiiin';
        return (
            <div>
                <h3>user { user}</h3>
                <input type='button'  value="set user" />
            </div>
        )
    }
}
