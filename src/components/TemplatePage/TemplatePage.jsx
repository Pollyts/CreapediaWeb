import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './TemplatePage.css';
import Toolbar from '../Toolbar/ToolbarTemplateFolder';
import logo from '../App/logo4x.png';

export default class TemplatePage extends Component{
    constructor(props){
        super(props); 
        this.state={folders:null, elements:null,  breadCrumbs:null};
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e) {
        e.preventDefault();
        this.props.history.push("/");
        localStorage.clear();    
        window.location.reload();      
      }      
    
    async GetFolders(parentid){
        const breadCrumbs = this.props.location.state.breadCrumbs; 
        const index = breadCrumbs.map(function(e) { return e.body.Id; }).indexOf(this.props.location.state.body.Id);
        // const index=breadCrumbs.indexOf(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
        if(index===-1)
        {
        breadCrumbs.push({
            title: this.props.location.state.body.Name,
            path: `/template`,
            body:{
                "Name":this.props.location.state.body.Name,
                "Id":this.props.location.state.body.Id
            }
          });
        }
        else
        {
            breadCrumbs.length=index+1;
        }
        console.log(process.env.REACT_APP_API_TEMPLATEFOLDERS+`/${parentid}`);
        await fetch(process.env.REACT_APP_API_TEMPLATEFOLDERS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data, breadCrumbs:breadCrumbs});
        }).catch(err => console.log(err));  
        console.log(this.state);
    }
    GetElements(parentid){
        console.log(process.env.REACT_APP_API_TEMPLATEELEMENTS+`/${parentid}`);
        fetch(process.env.REACT_APP_API_TEMPLATEELEMENTS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({elements:data});
        }).catch(err => console.log(err));
    }

    async componentDidMount(){
        await this.GetFolders(this.props.location.state.body.Id);
        await this.GetElements(this.props.location.state.body.Id);
    }
    async componentDidUpdate(prevProps){
        console.log("Я в обновлении темплэйта");
      if (prevProps.location.state.body.Id !== this.props.location.state.body.Id)      
      {
        await this.GetFolders(this.props.location.state.body.Id);
        await this.GetElements(this.props.location.state.body.Id);
        // window.location.reload();
      }
  }

    render(){
        if ((!this.state.folders)||(!this.state.elements)) {
            return <div />
          }
        const {folders, elements,breadCrumbs}=this.state;//сначала
        return(
            <div className="folderPage">
                <div className="Header">
                <div className="BreadCrumbs">
                {breadCrumbs.map(bc=>
                        <div key={bc.title} className="gt">      
                            <Link className="BreadCrumb" to={{pathname:bc.path, state:{body:bc.body, breadCrumbs:breadCrumbs}}} >
                             {bc.title} 
                              </Link>
                              &ensp;&rarr;&ensp;
                        </div>)}
                        </div> 
                        <div className="settingsinheader">
              {<button className="btn_logout" onClick={this.handleClick}>настройки</button>}
              {<button className="btn_logout" onClick={this.handleClick}>выход</button>}
              <img className="logo" src={logo} alt="toolbaritem"/>
              </div>
                        </div>   
                                               
            <div className="listview">              
                        {folders.map(folder=>
                        <div key={folder.Id}>
                            <Link className="folderinlist" to={{pathname:`/template`, state: {breadCrumbs:breadCrumbs, body:folder}}}>
                             <div className="NameElementOfList"> 
                             {folder.Name}
                              </div>
                              </Link>
                        </div>)} 
                        {elements.map(folder=>
                        <div key={folder.Id}>                            
                            <Link className="elementinlist" to={{pathname:`/telement`, state: {breadCrumbs:breadCrumbs, body:folder}}}>
                            {/* {folder.Image===undefined} */}
                            {/* <img className="elementimage" src={`data:image/jpeg;base64,${folder.Image}`} /> */}
                            <div className="NameElementOfList"> 
                             {folder.Name}
                              </div>
                              </Link>
                        </div>)}          
                                      
                           <div className="foldercomponents">
                        </div>  
                        
                        </div>
                        <div className="foldercomponents">
                        <Toolbar previouspages={breadCrumbs} parent={this.props.location.state.body}></Toolbar>
                        </div>
                        </div>  
        )
    }
}