import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './MainPage.css';
import getToken from '../getToken'
import Toolbar from '../Toolbar/Toolbar';

export default class MainPage extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={folders:[], user:{}}        
    }
    
    GetMainFolders(user){
        fetch(process.env.REACT_APP_API_TFOLDERS+`?userid=${user.Id}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data, user:user});
            console.log(data);
        }).catch(err => console.log(err));
    }
    async loginUser (login, password)
    {
  console.log(login);
  console.log(password);
  console.log(process.env.REACT_APP_API_USERS);
    return fetch(process.env.REACT_APP_API_USERS+`?mail=${login}&pass=${password}`,{
        method:'GET',
        headers: {
          'Content-Type':'application/json'
      }}).then(data => data.json())
}

    async componentDidMount(){
        const user = await this.loginUser(this.props.location.state.token.Name,this.props.location.state.token.Password);
        if(user)
        {
            this.GetMainFolders(user);
        }        
        else
        {
            localStorage.clear();            
        }
    }

    render(){
        const folders=this.state.folders;
        const user=this.state.user;
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
            
                        {folders.map(dep=>
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