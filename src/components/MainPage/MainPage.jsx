import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './MainPage.css';
import getToken from '../getToken'

export default class MainPage extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={deps:[]}        
    }
    
    GetMainFolders(userid){
        fetch(process.env.REACT_APP_API_TFOLDERS+`?userid=${userid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({deps:data});
            console.log(data);
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        if(getToken().Id==this.props.match.params.id)
        {
        this.GetMainFolders(this.props.match.params.id);
        }
        else
        {
            this.props.history.push('/')
        }
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