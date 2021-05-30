import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './MainPage.css';
import getToken from '../getToken'
import Toolbar from '../Toolbar/Toolbar';

export default class MainPage extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state={user:null, mainfolders:null}        
    }
    
    async GetMainFolders(userid){
        await fetch(process.env.REACT_APP_API_FOLDERS+`/main/${userid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({mainfolders:data});
            console.log(data);
        }).catch(err => console.log(err));
    }
    async loginUser (login, password)
    {
    return await fetch(process.env.REACT_APP_API_USERS+`?mail=${login}&pass=${password}`)
    .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({user:data});
            return data;
        }).catch(err => console.log(err));
}

    async componentDidMount(){
        if(this.props.location.state.body==null)
        {
            localStorage.clear();
            window.location.reload();
        }
        const user = await this.loginUser(this.props.location.state.body.Mail,this.props.location.state.body.Password);
        if(user)
        {
            await this.GetMainFolders(user.Id);
        }        
        else
        {
            localStorage.clear();
            window.location.reload();            
        }
    }

    render(){
        if ((!this.state.user)||(!this.state.mainfolders)) {
            return <div />
          }
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
                            <Link to={{pathname:`/projects`, state: {breadCrumbs:breadCrumbs,body:{Id:0, Name:'Проекты'}}}}>
                            <button className='buttonfolder'> 
                             Проекты
                              </button>
                              </Link>  
                              <Link to={{pathname:`/template`, state: {breadCrumbs:breadCrumbs,body:{Id:0, Name:'Библиотека компонентов'}}}}>
                              <button className='buttonfolder'> 
                             Библиотека компонентов
                              </button>
                              </Link>
                        </div>  
                        </div>
        )
    }
}