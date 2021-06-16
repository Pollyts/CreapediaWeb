import React, {Component} from 'react';
import '../ModalPages.css';

async function SaveFolder (name, parentfolderid)
{   
    const folder =   {
      "Name": name,
      "ParentfolderId": Number(parentfolderid)
   }
    await fetch(process.env.REACT_APP_API_TEMPLATEFOLDERS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(folder), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(function(response) {
            console.log(response.status)});
}

export default class AddTemplateFolder extends Component{
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
        await SaveFolder(this.state.name,this.props.folder.Id );
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
                    <div className="modal-title">Создание папки</div>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                {/* <label className="formlabel">Расположение:</label>
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button arrow"> -{'>'} </button>
                </div> */}
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