import React, {Component} from 'react';
import './ModalPages.css';

async function SaveElement (name, parentfolderid)
{   
    const folder =   {
       "Name": name,
       "Parentfolderid": Number(parentfolderid)
   }
    console.log(folder);
    var data = new FormData();
    data.append( "json", JSON.stringify( folder ) );
    console.log(process.env.REACT_APP_API_ELEMENTS);
    fetch(process.env.REACT_APP_API_ELEMENTS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(folder), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class AddElement extends Component{
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
        await SaveElement(this.state.name,this.props.folder.Id );
        alert("Имя: " + this.state.name);        
        this.props.onClose();        
        window.location.reload();
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
                    <h4 className="modal-title">Создание элемента</h4>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                <label className="formlabel">Расположение:</label>
                <button className="button">{this.props.folder.name}</button>
                </div>
                <div className="modal-footer">
                <button className="button" onClick={this.handleSubmit}>Save</button>
                <button className="button" onClick={this.props.onClose}>Close</button>
                </div>
            </div>            
            </div>
        )
    }
}
