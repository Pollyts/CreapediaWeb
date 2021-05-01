import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect, useParams} from "react-router-dom";
import './TemplatePage.css';

export default class TemplatePage extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={deps:[]}
    }
    
    GetFolders(parentid){
        fetch(process.env.REACT_APP_API_TFOLDERS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({deps:data});
            console.log(data);
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.GetFolders(this.props.match.params.id);
    }
    componentDidUpdate(prevProps){
      if (prevProps.match.params.id !== this.props.match.params.id)
      this.GetFolders(this.props.match.params.id);
  }

    render(){
        const {deps}=this.state;
        return(
            <div className="login-wrapper">  
            
                        {deps.map(dep=>
                        <div key={dep.Id}>
                            <Link to={{pathname: `/template/${dep.Id}`}}>
                             <button > 
                             {dep.Name}
                              </button>
                              </Link>
                        </div>)}     
                        </div>  
        )
    }
}