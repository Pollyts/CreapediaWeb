import React, {Component} from 'react';
import './ModalPages.css';

async function SaveFolder (userid, name, parentfolderid)
{   
    const folder =   {
      "UserId":1,
      "Name": name,
      "ParentfolderId": Number(parentfolderid)
   }
    console.log(folder);
    var data = new FormData();
    data.append( "json", JSON.stringify( folder ) );
    console.log(process.env.REACT_APP_API_FOLDERS);
    await fetch(process.env.REACT_APP_API_FOLDERS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(folder), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Access-Control-Request-Method':'POST',
            'Origin': 'http://localhost:3000',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class AddElement extends Component{
    constructor(props){
        super(props);
        this.state={name:"", folders:null, breadCrumbs:null}
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.changedirectory = this.changedirectory.bind(this);
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    changedirectory = param => async e => {

    };
   
    handleSubmit = async e => {
        e.preventDefault();
        console.log(this.props);
        await SaveFolder(6,this.state.name,this.props.folder.Id );
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
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button"> -{'>'} </button>
                </div>
                <div>
                <div>
                {this.props.prevpages.map(bc=>
                        <div key={bc.title} className="gt">
                            <button className="BreadCrumb" onClick={this.changedirectory({body:bc.body})}>
                             {bc.title} 
                              </button>
                              &gt;&gt;
                        </div>)}
                        </div>                              

                </div>
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