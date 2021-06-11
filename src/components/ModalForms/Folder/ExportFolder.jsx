import React, {Component} from 'react';
import '../ModalPages.css';
import {Redirect} from "react-router-dom";

async function ExportToUser (folderid, usermail)
{   
    await fetch(process.env.REACT_APP_API_FOLDERS + `/exporttouser?folderid=${folderid}&usermail=${usermail}`,{
        method: 'GET', // или 'PUT'
        headers: {
            'Content-Type':'application/json'
        }}).then(data => data.json());
}
async function ExportToLibrary (folderid, password)
{   
    await fetch(process.env.REACT_APP_API_FOLDERS + `/exporttolibrary?folderid=${folderid}&password=${password}`,{
        method: 'GET', // или 'PUT'
        headers: {
            'Content-Type':'application/json'
        }}).then(data => data.json());
}
async function ExportToFolder (folderid, newrootid)
{   
    await fetch(process.env.REACT_APP_API_FOLDERS + `/exporttofolder?folderid=${folderid}&newrootid=${newrootid}`,{
        method: 'GET', // или 'PUT'
        headers: {
            'Content-Type':'application/json'
        }}).then(data => data.json());
}

export default class ExportFolder extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state={exporttype:null, body:null, path:{Name:this.props.folder.Name, Id:this.props.folder.Id}, folders:null, breadCrumbs:this.props.prevpages, text:"Показать"}
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.setTypeOfExport = this.setTypeOfExport.bind(this); 
        this.onMailChange = this.onMailChange.bind(this); 
        this.onPasswordChange = this.onPasswordChange.bind(this); 
        this.showlocation = this.showlocation.bind(this); 
        this.changedirectory = this.changedirectory.bind(this); 
               
    }

    handleSubmit = async e => {
        e.preventDefault();
        if(this.state.exporttype==="user")
        {
            await ExportToUser(this.props.folder.Id, this.state.body);
        }
        else if (this.state.exporttype==="library")
        {
            await ExportToLibrary(this.props.folder.Id, this.state.body);

        }
        else if (this.state.exporttype==="folder")
        {
            await ExportToFolder(this.props.folder.Id, this.state.path.Id)
        }    
        this.props.onClose();
      }

    changedirectory= param => async event => {
        const breadCrumbs = this.state.breadCrumbs; 
        const index = breadCrumbs.map(function(e) { return e.body.Id; }).indexOf(param.Id);
        if(index===-1)
        {
        breadCrumbs.push({
            title: param.Name,
            path: `/projects`,
            body:{
                "Name":param.Name,
                "Id":param.Id
            }
          });
        }
        else
        {
            breadCrumbs.length=index+1;
        }
        await fetch(process.env.REACT_APP_API_FOLDERS+`/${param.Id}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data, breadCrumbs:breadCrumbs, path:{Name:param.Name, Id:param.Id}});
        }).catch(err => console.log(err));  
        console.log(this.state);
    };

    async showlocation(event){
        await fetch(process.env.REACT_APP_API_FOLDERS+`/${this.props.folder.Id}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.state.text==="Показать"?this.setState({text:'Свернуть',folders:data}):this.setState({text:'Показать'});
        }).catch(err => console.log(err));  
        
    }

    setTypeOfExport(event) {
        if(event.target.value==="folder")
        {
            this.setState({exporttype:event.target.value, path:{Name:this.props.folder.Name, Id:this.props.folder.Id}});
        }
        
        else
        {
            this.setState({exporttype:event.target.value});
        }
        console.log("wow");
      }
      onMailChange(event) {
        this.setState({body:event.target.value});
      }
      onPasswordChange(event) {
        this.setState({body:event.target.value});
      }
   
    
    async componentDidUpdate(prevProps){
    if (prevProps.folder.Id !== this.props.folder.Id)
    {
        this.setState({exporttype:null, body:null, path:{Name:this.props.folder.Name, Id:this.props.folder.Id}, folders:null, breadCrumbs:this.props.prevpages, text:"Показать"});
    }
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
                    <div className="modal-title">Экспорт папки {this.props.folder.Name}</div>
                </div>
                <div className="modal-body">   
                <div className="formwithradio">
                <div className="radiobutton" onChange={this.setTypeOfExport.bind(this)}>
                <input type="radio" value="user" name="gender"/> Другому пользователю
                </div>
                <div className="radiobutton" onChange={this.setTypeOfExport.bind(this)}>
                <input type="radio" value="folder" name="gender"/> В другую папку
                </div>
                <div className="radiobutton" onChange={this.setTypeOfExport.bind(this)}>
                <input type="radio" value="library" name="gender"/> В общую библиотеку
                </div>
                </div>   
                </div>
                {this.state.exporttype==="user" ? <div className="modal-body">
                    <label className="formlabel"> Введите почту получателя:</label>
                    <input className="forminput" type="text" value={this.state.body} onChange={this.onMailChange}/>
                </div> :null}
                {this.state.exporttype==="library" ? <div className="modal-body">
                    <label className="formlabel"> Задайте пароль:</label>
                    <input className="forminput" type="text" value={this.state.body} onChange={this.onPasswordChange}/>
                </div> :null}
                {this.state.exporttype==="folder" ? <div className="modal-body">
                <label className="formlabel">Экспорт в папку:</label>
                <div className="selectedpath"><label>{this.state.path.Name}</label> <button className="button arrow" onClick={this.showlocation}> {this.state.text} {this.state.text==="Показать"? <div>&ensp;&darr;</div>:<div>&ensp;&uarr;</div>} </button></div>
                
                <div className="place">        
                {this.state.text==="Показать"? null:<div className="parentwindowforselectingpath">
                    <div className="modalbreadcrumbs">
                {this.state.breadCrumbs.slice(1).map(bc=>
                        <div key={bc.title} className="gt">
                            <button className="BreadCrumb withoutframe" onClick={this.changedirectory({Id:bc.body.Id, Name:bc.body.Name})}>
                             {bc.title} 
                              </button>
                              &ensp;&rarr;&ensp;
                        </div>)}
                        </div>
                <div className="windowforselectingpath">
                
                        <div className="modalfolders">              
                        {this.state.folders.map(folder=>
                        <div key={folder.Id}>
                            <button className="modalbuttonfolder" onClick={this.changedirectory({Id:folder.Id, Name:folder.Name})}>
                             <div> 
                             {folder.Name}
                              </div>
                              </button>
                        </div>)}                         
                        </div>
                        </div>                              

                </div>}
                
                </div>
                </div> :null}
                <div className="modal-footer">
                <button className="button SaveButton"  onClick={this.handleSubmit}>Экспортировать</button>
                <button className="button CloseButton" onClick={this.props.onClose}>Отменить</button>
                </div>
            </div>            
            </div>
        )
    }
}