import React, {Component} from 'react';
import '../ModalPages.css';
async function SaveElement (name, pfid)
{ 
    const element =   {
        "Name": name,
        "ParentfolderId": Number(pfid)
     }
     let elemid;
    await fetch(process.env.REACT_APP_API_ELEMENTS,{
        method: 'POST', // или 'PUT'
        body: JSON.stringify(element), // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }}).then(response=>{ return response.json()})
          .then(data=>{
              elemid=data;
          }).catch(err => console.log(err));
    return elemid
    }
    async function SaveImage (id,elwithimg){
        await fetch(process.env.REACT_APP_API_ELEMENTS+`/image/${id}`,{
            method: 'POST', // или 'PUT'
            body: elwithimg, // данные могут быть 'строкой' или {объектом}!
            headers: {
                'Accept': 'application/json'
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
        const elemid=await SaveElement(this.state.name, this.props.folder.Id);
        if (this.state.file!=null)
        await SaveImage(elemid, this.state.file);
        this.props.onClose();        
        window.location.reload();
    };
    
    handleImageChange(e) {
        e.preventDefault();
        if(e.target.files.length>0)
        {
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        this.setState({ file: form, filepath: URL.createObjectURL(e.target.files[0])});
    }
    else if (this.state.file!=null)
    {
        this.setState({ file: null, filepath: null})
    }
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
                    <div className="modal-title">Создание элемента</div>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                {/* <label className="formlabel">Расположение:</label>
                <div className="place">
                <label>{this.props.folder.Name}</label> <button className="button arrow"> -{'>'} </button>
                </div> */}
                <div className="modal-image">
                <label className="formlabel">Изображение:</label>   
                <label className="custom-file-upload">Загрузить изображение           
                <input type="file" onChange={(e)=>this.handleImageChange(e)}/>  
                </label>  
                {this.state.filepath===null ? <div/> :<img className="downloadimage" src={this.state.filepath}/>}             
                
                </div>
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
