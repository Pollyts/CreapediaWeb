import React, {Component} from 'react';
import './ModalPages.css';

async function DeleteFolder (folderid)
{
    fetch(process.env.REACT_APP_API_TFOLDERS + `/${folderid}`,{
        method: 'DELETE', // или 'PUT'
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}
async function DeleteElement (elementid)
{   
    fetch(process.env.REACT_APP_API_TELEMENTS + `/${elementid}`,{
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
        this.state={name:""}
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({name: val});
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
