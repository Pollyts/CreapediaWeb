import React, {Component} from 'react';
import './ModalPages.css';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter} from "react-router-dom";

async function DeleteFolder (folderid)
{
    fetch(process.env.REACT_APP_API_FOLDERS + `/${folderid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}
async function DeleteElement (elementid)
{   
    fetch(process.env.REACT_APP_API_ELEMENTS + `/${elementid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class DeleteComponent extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={isdeleted:null}
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
   
    handleSubmit = async e => {
        e.preventDefault();
        if(this.props.typeofcomponent==="template")
        {
          await DeleteFolder(this.props.component.Id);  
        }        
        else
        {
            await DeleteElement(this.props.component.Id);
        }        
        this.props.onClose();
        this.setState({isdeleted:true});
      }

    render(){
        console.log("рендер удаления");
        if(this.state.isdeleted)
        {
            let bc=this.props.prevpages;
            bc.length=bc.length-1;
            this.setState({isdeleted: false});
            console.log("Я в удалении");
            return <Redirect to={{pathname: bc[bc.length-1].path, state: { body: bc[bc.length-1].body, breadCrumbs:bc}            
  }}/>
        }
        if(!this.props.show)
        {
            return null
        }     
        
        console.log(this.props);
        return(
            <div className="ModalPage" onClick={this.props.onClose}> 
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Удаление {this.props.component.Name}</h4>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Вы действительно хотите удалить {this.props.typeofcomponent==="template" ? 'папку' : 'элемент'} {this.props.component.Name}?</label>
                </div>
                <div className="modal-footer">
                <button className="button" onClick={this.handleSubmit}>Да</button>
                <button className="button" onClick={this.props.onClose}>Отменить</button>
                </div>
            </div>            
            </div>
        )
    }
}
