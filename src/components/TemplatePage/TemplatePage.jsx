import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect, useParams} from "react-router-dom";
import './TemplatePage.css';
import getToken from '../getToken'

export default class TemplatePage extends Component{
    constructor(props){
        super(props);
        this.state={folders:[], elements:[]}
        console.log(this.props);
    }    
    
    GetFolders(parentid){
        fetch(process.env.REACT_APP_API_TFOLDERS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data});
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
        const {folders, elements}=this.state;
        console.log(this.state);
        return(
            <div>
            <h1>{this.props.match.params.name}</h1>
            <div className="login-wrapper">  
            
                        {folders.map(folder=>
                        <div key={folder.Id}>
                            <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}>
                             <button > 
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