import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect, useParams} from "react-router-dom";
import './TemplatePage.css';
import getToken from '../getToken'
import Toolbar from '../Toolbar/Toolbar';

export default class TemplatePage extends Component{
    constructor(props){
        super(props); 
        this.state={folders:[], elements:[],  breadCrumbs:[]};
    }    
    
    GetFolders(parentid){
        const breadCrumbs = this.props.location.state.breadCrumbs; 
        // if(!breadCrumbs.some(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`))
        const index = breadCrumbs.map(function(e) { return e.path; }).indexOf(`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
        // const index=breadCrumbs.indexOf(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
        if(index==-1)
        {
        breadCrumbs.push({
            title: this.props.match.params.name,
            path: `/template/${this.props.match.params.id}/${this.props.match.params.name}`
          });
        }
        else
        {
            breadCrumbs.length=index+1;
        }
        console.log(breadCrumbs);
        fetch(process.env.REACT_APP_API_TFOLDERS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data, breadCrumbs:breadCrumbs});
        }).catch(err => console.log(err));               
    }
    GetElements(parentid){
        fetch(process.env.REACT_APP_API_TELEMENTS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({elements:data});
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.GetFolders(this.props.match.params.id);
        this.GetElements(this.props.match.params.id);
    }
    componentDidUpdate(prevProps){
      if (prevProps.match.params.id !== this.props.match.params.id)
      {
      this.GetFolders(this.props.match.params.id);
      this.GetElements(this.props.match.params.id);
      }
  }

    render(){
        const {folders, elements,breadCrumbs}=this.state;
        return(
            <div>
                <div className='header2'>{this.props.match.params.name}</div>
                <div className="BreadCrumbs">
                {breadCrumbs.map(bc=>
                        <div key={bc.title} className="gt">                            
                            {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                            <Link className="BreadCrumb" to={{pathname:bc.path, state: {breadCrumbs}}}>
                             {bc.title} 
                              </Link>
                              &gt;&gt;
                        </div>)}
                        </div>    
                        <Toolbar typeof_parentel="mainpage"></Toolbar>        
            <div className="login-wrapper">              
                        {folders.map(folder=>
                        <div key={folder.Id}>
                            {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                            <Link to={{pathname:`/template/${folder.Id}/${folder.Name}`, state: {breadCrumbs}}}>
                             <button className='buttonfolder'> 
                             {folder.Name}
                              </button>
                              </Link>
                        </div>)} 

                        {elements.map(folder=>
                        <div key={folder.Id} className="element">
                            <Link to={{pathname: `/template/${folder.Id}`}}>
                             {folder.Name}
                              </Link>
                        </div>)} 
                        
                           
                        </div>  
                        </div>
        )
    }
}