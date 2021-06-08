import React, {Component} from 'react';
import '../ModalPages.css';
async function SaveTemplateElement (elwithimg)
{ 
    await fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS,{
        method: 'POST', // или 'PUT'
        body: elwithimg, // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
          }}).then(function(response) {
            console.log(response.status)});
    }

export default class AddElement extends Component{
    constructor(props){
        super(props);
        this.state={name:"", filepath:null, file: null}
        this.onChange = this.onChange.bind(this);
        this.sendImage = this.sendImage.bind(this); 
        this.handleImageChange = this.handleImageChange.bind(this);     
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    async sendImage(event) {
        event.preventDefault();
        await SaveTemplateElement(this.state.file);
        this.props.onClose();        
        window.location.reload();
    };
    
    handleImageChange(e) {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('parentfolderid', this.props.folder.Id);
        form.append('Name', this.state.name);
        this.setState({ file: form, filepath: URL.createObjectURL(e.target.files[0])});
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
                    <div className="modal-title">Создание шаблонного элемента</div>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                <label className="formlabel">Расположение:</label>
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button arrow"> -{'>'} </button>
                </div>
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
