import React, {Component} from 'react';
import '../ModalPages.css';
import {Redirect} from "react-router-dom";

async function SaveFolder (name, parentfolderid)
{   
    const folder =   {
      "Name": name,
      "Id": Number(parentfolderid)
   }
    await fetch(process.env.REACT_APP_API_FOLDERS,{
        method: 'PUT', // или 'PUT'
        body: JSON.stringify(folder), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class EditFolder extends Component{
    constructor(props){
        super(props);
        this.state={name:this.props.folder.Name, folders:null, isupdated:null}
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
        await SaveFolder(this.state.name,this.props.folder.Id );
        this.props.onClose();
        this.setState({isupdated:true});
      }
componentDidUpdate(prevProps){
    if (prevProps.folder.Id !== this.props.folder.Id)
    {
        console.log("zashel");
        this.setState({name:this.props.folder.Name, folders:null, isupdated:null});
    }    
}
    render(){
        if(this.state.isupdated)
        {
            let bc=this.props.prevpages;
            bc[bc.length-1].title=this.state.name;
            bc[bc.length-1].body.Name=this.state.name;
            this.setState({isupdated: false});
            return <Redirect to={{pathname: bc[bc.length-1].path, state: { body: bc[bc.length-1].body, breadCrumbs:bc}            
  }}/>
        }
        if(!this.props.show)
        {
            return null
        }
        
        return(
            <div className="ModalPage" onClick={this.props.onClose}> 
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">Редактировать папку</div>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                <label className="formlabel">Расположение:</label>
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button arrow"> -{'>'} </button>
                </div>
                {/* <div>
                <div>
                {this.props.prevpages.map(bc=>
                        <div key={bc.title} className="gt">
                            <button className="BreadCrumb" onClick={this.changedirectory({body:bc.body})}>
                             {bc.title} 
                              </button>
                              &gt;&gt;
                        </div>)}
                        </div>                              

                </div> */}
                </div>
                <div className="modal-footer">
                <button className="button SaveButton" onClick={this.handleSubmit}>Сохранить</button>
                <button className="button CloseButton" onClick={this.props.onClose}>Назад</button>
                </div>
            </div>            
            </div>
        )
    }
}
