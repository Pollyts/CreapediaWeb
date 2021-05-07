import React, {Component} from 'react';
import './ModalPages.css';

async function SaveFolder (userid, name, parentfolderid)
{   
    const folder =   {
        "UserId":6,
       "Name": name,
       "ParentfolderId": Number(parentfolderid)
   }
    // const data = {"client_id":"admin-cli","username":"xx","password":"xx,"grant_type":"password"};
    // const formData = new FormData();
    // for(n in folder) {
    //     formData.append(n, folder[n]);
    // } 
    console.log(folder);
    var data = new FormData();
    data.append( "json", JSON.stringify( folder ) );
    console.log(process.env.REACT_APP_API_TFOLDERS);
    fetch(process.env.REACT_APP_API_TFOLDERS,{
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
        await SaveFolder(6,this.state.name,this.props.folder.id );
        alert("Имя: " + this.state.name);
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
                    <h4 className="modal-title">Создание элемента</h4>
                </div>
                <div className="modal-body">
                Название:
                <input type="text" value={this.state.name} onChange={this.onChange}/>
                Расположение:
                <button>{this.props.folder.name}</button>
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
