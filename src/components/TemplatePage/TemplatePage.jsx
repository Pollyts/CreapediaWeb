import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect, useParams} from "react-router-dom";
import './TemplatePage.css';
import getToken from '../getToken'

export default class TemplatePage extends Component{
    constructor(props){
        super(props); 
        this.state={folders:[], elements:[],  breadCrumbs:[]};
        console.log(this.props);
    }    
    
    GetFolders(parentid){
        const breadCrumbs = this.props.location.state.breadCrumbs; 
        if(!breadCrumbs.some(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`))
        breadCrumbs.push({
            title: this.props.match.params.name,
            path: `/template/${this.props.match.params.id}/${this.props.match.params.name}`
          });
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
        console.log(breadCrumbs);
        return(
            <div>
                {breadCrumbs.map(bc=>
                        <div key={bc.title}>
                            {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                            <Link to={{pathname:bc.path, state: {breadCrumbs}}}>
                             {bc.title}
                              </Link>
                        </div>)}
            <h1>{this.props.match.params.name}</h1>
            <div className="login-wrapper">              
                        {folders.map(folder=>
                        <div key={folder.Id}>
                            {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                            <Link to={{pathname:`/template/${folder.Id}/${folder.Name}`, state: {breadCrumbs}}}>
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