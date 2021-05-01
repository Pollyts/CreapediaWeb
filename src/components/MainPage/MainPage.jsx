import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './MainPage.css';
import TemplatePage from '../TemplatePage/TemplatePage'

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
        this.GetMainFolders(this.props.userinfo.Id);
    }

    render(){
        const {deps}=this.state;
        return(
            <BrowserRouter>
            <div className="login-wrapper">  
            
                        {deps.map(dep=>
                        <div key={dep.Id}>
                            <Link to="/templates">
                             <button > 
                             {dep.Name}
                              </button>
                              </Link>
                        </div>)}
            
            <Switch>
                <Route exact path="/templates" component={TemplatePage} />
            </Switch>
            </div>
            </BrowserRouter>         
            
        )
    }
}

class Nav extends React.Component{
    render(){
        return <nav>
                <Link to="/">Главная</Link>  
                <Link to="/about">О сайте</Link>  
                <Link to="/products">Товары</Link>
              </nav>;
    }
}