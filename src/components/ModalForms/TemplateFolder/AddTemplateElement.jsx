import React, {Component} from 'react';
import '../ModalPages.css';
async function SaveTemplateElement (name, pfid )
{ 
    const telem =   {
        "Name": name,
        "ParentfolderId": Number(pfid)
     }
    await fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(telem), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }});
    }

export default class AddElement extends Component{
    constructor(props){
        super(props);
        this.state={name:""}
        this.onChange = this.onChange.bind(this);
        this.sendImage = this.sendImage.bind(this);  
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    async sendImage(event) {
        event.preventDefault();
        await SaveTemplateElement(this.state.name, this.props.folder.Id);
        this.props.onClose();        
        window.location.reload();
    }; 
    

    render(){
        if(!this.props.show)
        {
            return null
        }
        return(
            <div className="ModalPage" onClick={this.props.onClose}> 
            <div className="modal-content" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">Создание класса</div>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                {/* <label className="formlabel">Расположение:</label>
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button arrow"> -{'>'} </button>
                </div> */}
                {/* <div className="modal-image">
                <label className="formlabel">Фото:</label>                
                <input type="file" onChange={(e)=>this.handleImageChange(e)}/>                
                <img className="downloadimage" src={this.state.filepath}/>
                </div> */}
                </div>                
                <div className="modal-footer">
                <button className="button SaveButton" onClick={this.sendImage}>Сохранить</button>
                <button className="button CloseButton" onClick={this.props.onClose}>Назад</button>
                </div>
            </div>            
            </div>
        )
    }
}
