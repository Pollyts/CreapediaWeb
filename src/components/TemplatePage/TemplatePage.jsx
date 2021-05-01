import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class TemplatePage extends Component{
    // constructor(props){
    //     super(props);
    //     console.log(props);
    //     this.state={deps:[]}
    // }
    
    // GetMainFolders(userid){
    //     fetch(process.env.REACT_APP_API_TFOLDERS+`?userid=${userid}`) 
    //     .then(response=>{ return response.json()})
    //     .then(data=>{
    //         this.setState({deps:data});
    //         console.log(data);
    //     }).catch(err => console.log(err));
    // }

    // componentDidMount(){
    //     this.GetMainFolders(this.props.userinfo.Id);
    // }

    render(){
        // const {deps}=this.state;
        return(
        //     <div className="login-wrapper">  
        //     <Router>
        //     <Switch>
        //         <Route exact path="/" component={TemplatePage} />
        //         <Route path="/about" component={About} />
        //         <Route component={NotFound} />
        //     </Switch>
        // </Router>,          
        //                 {deps.map(dep=>
        //                      <button key={dep.Id} > 
        //                      {dep.Name}
        //                       </button>)}
        //     </div>
        <h1>Helloworld!</h1>
        )
    }
}