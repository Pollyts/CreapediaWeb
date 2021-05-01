import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './MainPage.css';
import TemplatePage from '../TemplatePage'

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
            <div className="login-wrapper">  
            <BrowserRouter>
            <Switch>
                <Route exact path="/templates" component={TemplatePage} />
                {/* <Route path="/about" component={About} />
                <Route component={NotFound} /> */}
            </Switch>
            </BrowserRouter>         
                        {deps.map(dep=>
                        <div key={dep.Id}>
                            <Link to="/templates">
                             <button > 
                             {dep.Name}
                              </button>
                              </Link>
                        </div>)}
            </div>
        )
    }
}