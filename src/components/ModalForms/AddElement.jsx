import React, {Component} from 'react';
import './ModalPages.css';

// async function SaveElement (name, parentfolderid, image)
async function SaveElement (elwithimg)
{ 
    await fetch(process.env.REACT_APP_API_ELEMENTS,{
        method: 'POST', // или 'PUT'
        body: elwithimg, // данные могут быть 'строкой' или {объектом}!
        headers: {
            'Accept': 'application/json',
          }}).then(function(response) {
            console.log(response.status)});
    }
// async function SaveTemplateElement (name, parentfolderid)
// {   
//     const templateelement =   {
//        "Name": name,
//        "Parentfolderid": Number(parentfolderid)
//    }
//         fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS,{
//             method: 'POST', // или 'PUT'
//             body: JSON.stringify(templateelement), // данные могут быть 'строкой' или {объектом}!
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//               }}).then(function(response) {
//                 console.log(response.status)});
//     }

export default class AddElement extends Component{
    constructor(props){
        super(props);
        this.state={name:"", filepath:null, file: null}
        this.onChange = this.onChange.bind(this);
        this.sendImage = this.sendImage.bind(this); 
        this.handleImageChange = this.handleImageChange.bind(this);
        // this.addImage = this.addImage.bind(this)             
    }   
    onChange(e) {
        var val = e.target.value;
        this.setState({name: val});
    }

    async sendImage(event) {
        event.preventDefault();
        if(this.props.typeofcomponent==="folder")
        await SaveElement(this.state.file);     
        else
        // await SaveTemplateElement(this.state.name,this.props.folder.Id );     
        this.props.onClose();        
        window.location.reload();
    };
    // addImage = async (image) => {
    //     await fetch('https://localhost:44348/elements',
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json'
    //               },
    //             body: this.state.file
    //         }
    //     )
    // }
    
    handleImageChange(e) {
        e.preventDefault();
        let form = new FormData();
        for (var index = 0; index < e.target.files.length; index++) {
            var element = e.target.files[index];
            form.append('image', element);
        }
        form.append('parentfolderid', this.props.folder.Id);
        form.append('Name', this.state.name);
        this.setState({ file: form });
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
                    <h4 className="modal-title">Создание элемента</h4>
                </div>
                <div className="modal-body">
                <label className="formlabel"> Название:</label>
                <input className="forminput" type="text" value={this.state.name} onChange={this.onChange}/>
                <label className="formlabel">Расположение:</label>
                <button className="placeholder">{this.props.folder.Name}</button>
                <div className="modal-image">
                <div>
                <label className="formlabel">Фото:</label>                
                <input type="file" onChange={(e)=>this.handleImageChange(e)}/>
                </div>
                <img className="downloadimage" src={this.state.filepath}/>
                </div>
                </div>                
                <div className="modal-footer">
                <button className="button" onClick={this.sendImage}>Save</button>
                <button className="button" onClick={this.props.onClose}>Close</button>
                </div>
            </div>            
            </div>
        )
    }
}
