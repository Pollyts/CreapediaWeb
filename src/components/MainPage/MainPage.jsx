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
    return fetch(process.env.REACT_APP_API_USERS+`?mail=${login}&pass=${password}`,{
        method:'GET',
        headers: {
          'Content-Type':'application/json'
      }}).then(data => data.json())
}

    async componentDidMount(){
        const user = await this.loginUser(this.props.location.state.body.Mail,this.props.location.state.body.Password);
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
              body: {
                  "Mail":this.state.user.Mail,
                  "Password":this.state.user.Password
              }            
            },
          ];
        return(
            <div>
                <div className='header'>Creapedia</div>
            <Toolbar typeof_parentel="mainpage" parent={'Null'}></Toolbar>
            <div className="login-wrapper">  
            
                        {folders.map(folder=>
                        <div key={folder.Id}>
                            <Link to={{pathname:`/template`, state: {breadCrumbs:breadCrumbs,body:folder}}}>
                             <button className='buttonfolder'> 
                             {folder.Name}
                              </button>
                              </Link>
                        </div>)}     
                        </div>  
                        </div>
        )
    }
}