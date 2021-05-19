import React, {Component} from 'react';
import './ModalPages.css';

async function ExportFolder (folderid, usermail)
{
    fetch(process.env.REACT_APP_API_FOLDERS + `/export?mail=${usermail}&folderid=${folderid}`,{
        method: 'GET', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

// process.env.REACT_APP_API_USERS+`?mail=${login}&pass=${password}
async function ExportElement (elementid, usermail)
{   
    fetch(process.env.REACT_APP_API_ELEMENTS + `/export?to=${usermail}&element=${elementid}`,{
        method: 'GET', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class DeleteComponent extends Component{
    constructor(props){
        super(props);
        this.state={mail:""}
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({mail: val});
    }
   
    handleSubmit = async e => {
        e.preventDefault();
        if(this.props.typeofcomponent==="template")
        {
          await ExportFolder(this.props.component.Id, this.state.mail);  
        }        
        else
        {
            await ExportElement(this.props.component.Id, this.state.mail);
        }        
        this.props.onClose();
      }

    render(){
        if(!this.props.show)
        {
            return null
        }
        return(
            <div className="ModalPage" onClick={this.props.onClose}> 
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">Экспорт {this.props.component.Name}</h4>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Введите почту получателя:</label>
                <input className="forminput" type="text" value={this.state.mail} onChange={this.onChange}/>
                <label className="formlabel">{this.props.typeofcomponent==="template" ? 'Папка' : 'Элемент'} {this.props.component.Name}</label>
                </div>
                <div className="modal-footer">
                <button className="button" onClick={this.handleSubmit}>Отправить</button>
                <button className="button" onClick={this.props.onClose}>Отменить</button>
                </div>
            </div>            
            </div>
        )
    }
}
