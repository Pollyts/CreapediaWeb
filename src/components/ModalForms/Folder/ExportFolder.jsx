import React, {Component} from 'react';
import '../ModalPages.css';
import {Redirect} from "react-router-dom";

async function DeleteFolder (folderid)
{
    await fetch(process.env.REACT_APP_API_FOLDERS + `/${folderid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}
async function ExportToUser (elementid)
{   
    await fetch(process.env.REACT_APP_API_ELEMENTS + `/${elementid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}
async function ExportToLibrary (elementid)
{   
    await fetch(process.env.REACT_APP_API_ELEMENTS + `/${elementid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}
async function ExportToFolder (elementid)
{   
    await fetch(process.env.REACT_APP_API_ELEMENTS + `/${elementid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class ExportFolder extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={exporttype:null, body:null}
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.setTypeOfExport = this.setTypeOfExport.bind(this); 
        this.onMailChange = this.onMailChange.bind(this); 
        this.onPasswordChange = this.onPasswordChange.bind(this); 
               
    }

    setTypeOfExport(event) {
        this.setState({exporttype:event.target.value});
        console.log("wow");
      }
      onMailChange(event) {
        this.setState({body:event.target.value});
      }
      onPasswordChange(event) {
        this.setState({body:event.target.value});
      }
   
    handleSubmit = async e => {
        e.preventDefault();
        // if(this.props.typeofcomponent==="folder")
        // {
        //   await DeleteFolder(this.props.component.Id);  
        // }        
        // else
        // {
        //     await DeleteElement(this.props.component.Id);
        // }        
        this.props.onClose();
        // this.setState({isdeleted:true});
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
                    <div className="modal-title">Экспорт папки {this.props.folder.Name}</div>
                </div>
                <div className="modal-body">   
                <div className="formwithradio">
                <div className="radiobutton" onChange={this.setTypeOfExport.bind(this)}>
                <input type="radio" value="user" name="gender"/> Другому пользователю
                </div>
                <div className="radiobutton" onChange={this.setTypeOfExport.bind(this)}>
                <input type="radio" value="folder" name="gender"/> В другую папку
                </div>
                <div className="radiobutton" onChange={this.setTypeOfExport.bind(this)}>
                <input type="radio" value="library" name="gender"/> В общую библиотеку
                </div>
                </div>   
                </div>
                {this.state.exporttype==="user" ? <div className="modal-body">
                    <label className="formlabel"> Введите почту получателя:</label>
                    <input className="forminput" type="text" value={this.state.body} onChange={this.onMailChange}/>
                </div> :null}
                {this.state.exporttype==="library" ? <div className="modal-body">
                    <label className="formlabel"> Задайте пароль:</label>
                    <input className="forminput" type="text" value={this.state.body} onChange={this.onPasswordChange}/>
                </div> :null}
                {this.state.exporttype==="folder" ? <div className="modal-body">
                <label className="formlabel">Расположение:</label>
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button arrow"> &ensp;&rarr;&ensp; </button>
                </div>
                </div> :null}
                <div className="modal-footer">
                <button className="button SaveButton"  onClick={this.handleSubmit}>Экспортировать</button>
                <button className="button CloseButton" onClick={this.props.onClose}>Отменить</button>
                </div>
            </div>            
            </div>
        )
    }
}
