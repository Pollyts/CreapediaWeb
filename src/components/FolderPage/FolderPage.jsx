import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import Toolbar from '../Toolbar/Toolbar';

var NeedUpdate = "no";

class FolderPage extends Component{
    constructor(props){
        super(props); 
        this.state={folders:null, elements:null,  breadCrumbs:null, update:false};
        this.SelectComponent = this.SelectComponent.bind(this);
        console.log (props);
    }    

    SelectComponent = param => e => {
        e.preventDefault();
        console.log(param);
        const bc=param.breadCrumbs;
        bc.push(param.selected);        
        this.props.UpdateHeader(bc);
        this.setState({update:true});
    }
    
    async GetFolders(parentid){
        const breadCrumbs = this.props.breadCrumbs;         
        await fetch(process.env.REACT_APP_API_FOLDERS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data, breadCrumbs:breadCrumbs, update:false});
        }).catch(err => console.log(err));  
        console.log(this.state);
    }
    GetElements(parentid){
        fetch(process.env.REACT_APP_API_ELEMENTS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({elements:data});
        }).catch(err => console.log(err));
    }


    async componentDidMount(){
        const body=this.props.breadCrumbs[this.props.breadCrumbs.length-1].body;
        if(body.Mail===undefined)
        {
            await this.GetFolders(body.Id);
        await this.GetElements(body.Id);
        }
        else{
            this.props.UpdateHeader(this.props.breadCrumbs);
            this.props.history.push("/main")
        }
        
    }
    async componentDidUpdate(prevProps){
        console.log("В обновлении папки")
        if((this.props.NeedUpdate==true)&&(NeedUpdate=="no"))
        {
            NeedUpdate = "need"
        }        
        if((this.state.update)||(NeedUpdate==="need"))
        {
        if(NeedUpdate==="need")
        NeedUpdate="yet"  
        if(this.state.update===true)
        NeedUpdate="no"            
        await this.GetFolders(this.props.breadCrumbs[this.props.breadCrumbs.length-1].body.Id);
        await this.GetElements(this.props.breadCrumbs[this.props.breadCrumbs.length-1].body.Id);
        
        }
        
  }

    render(){
        if ((!this.state.folders)||(!this.state.elements)) {
            return <div />
          }
        const {folders, elements,breadCrumbs}=this.state;//сначала
        return(
            <div>
                <div className='header2'>{breadCrumbs[breadCrumbs.length-1]?.title}</div>
                 
                        <Toolbar previouspages={breadCrumbs} typeof_parentel="folder" parent={this.props.breadCrumbs[this.props.breadCrumbs.length-1].body}></Toolbar>        
            <div className="login-wrapper">              
                        {folders.map(folder=>
                        <div key={folder.Id}>                            
                             <button className='buttonfolder'onClick={this.SelectComponent ({selected: {
                                title: folder.Name,
                                path: `/projects`,
                                body:{
                                    "Name":folder.Name,
                                    "Id":folder.Id
                                }
                              }, breadCrumbs:breadCrumbs})}> 
                             {folder.Name}
                              </button>
                        </div>)} 

                        {elements.map(folder=>
                        <div key={folder.Id} >
                            <Link  className="element" to={{pathname:`/element`, state: {breadCrumbs:breadCrumbs, body:folder}}}>
                             {folder.Name}
                              </Link>
                        </div>)}                        
                           
                        </div>  
                        </div>
        )
    }
    
}
export default withRouter(FolderPage)