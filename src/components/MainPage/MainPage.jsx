import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import './MainPage.css';

class MainPage extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.SelectComponent = this.SelectComponent.bind(this)
        this.state={user:null, mainfolders:null}   

    }
    SelectComponent = param => e => {
        e.preventDefault();
        console.log(param);
        const bc=param.breadCrumbs;
        bc.push(param.selected);        
        this.props.UpdateHeader(bc);
        this.props.history.push(param.selected.path);
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
        if(this.props.body==null)
        {
            localStorage.clear();
            window.location.reload();
        }
        const user = await this.loginUser(this.props.body.Mail,this.props.body.Password);
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
    async componentDidUpdate()
    {
        //
    }

    render(){
        if ((!this.state.user)||(!this.state.mainfolders)) {
            return <div />
          }
        const mainfolders=this.state.mainfolders;
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
          console.log('in app');       
        return(
            <div className="mainfolders">      
            {mainfolders.map(mf=>
                        <div key={mf.Id} className="mfolder">                            
                        {mf.Name==="Проекты"? 
                            <button className='buttonfolder' onClick={this.SelectComponent ({selected: {
                                title: mf.Name,
                                path: `/projects`,
                                body:{
                                    "Name":mf.Name,
                                    "Id":mf.Id
                                }
                              }, breadCrumbs:breadCrumbs})}> 
                             Проекты
                              </button>:<Link to={{pathname:`/template`, state: {breadCrumbs:breadCrumbs,body:{Id:mf.Id, Name:mf.Name}, UpdateHeader:this.UpdateHeader}}}>
                              <button className='buttonfolder'> 
                             Библиотека компонентов
                              </button>
                              </Link>}
                    </div>)}        
                        </div>  
        )
    }
}
export default withRouter(MainPage);