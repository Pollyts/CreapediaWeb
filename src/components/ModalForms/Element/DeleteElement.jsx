import React, {Component} from 'react';
import '../ModalPages.css';
import {Redirect} from "react-router-dom";

async function DeleteElement (elementid)
{   
    await fetch(process.env.REACT_APP_API_ELEMENTS + `/${elementid}`,{
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
        await DeleteElement(this.props.element.Id);
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
                    <div className="modal-title">Удаление элемента {this.props.element.Name}</div>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Вы действительно хотите удалить элемент {this.props.element.Name}?</label>
                </div>
                <div className="modal-footer">
                <button className="button SaveButton"  onClick={this.handleSubmit}>Да</button>
                <button className="button CloseButton" onClick={this.props.onClose}>Отменить</button>
                </div>
            </div>            
            </div>
        )
    }
}
