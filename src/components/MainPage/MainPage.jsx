import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './MainPage.css';
import getToken from '../getToken'
import Toolbar from '../Toolbar/Toolbar';

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
        if(Number(getToken().Id)===Number(this.props.match.params.id))
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
        const breadCrumbs = [
            {
              title: 'Главная',
              path: '/',
            },
          ];
        console.log('in main page');
        return(
            <div>
                <div className='header'>Creapedia</div>
            <Toolbar typeof_parentel="mainpage" parent={'Null'}></Toolbar>
            <div className="login-wrapper">  
            
                        {deps.map(dep=>
                        <div key={dep.Id}>
                            <Link to={{pathname:`/template/${dep.Id}/${dep.Name}`, state: {breadCrumbs}}}>
                             <button className='buttonfolder'> 
                             {dep.Name}
                              </button>
                              </Link>
                        </div>)}     
                        </div>  
                        </div>
        )
    }
}