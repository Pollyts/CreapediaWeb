import React, {Component} from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect, withRouter, Link} from "react-router-dom";
import MainPage from '../MainPage/MainPage';
import TemplatePage from '../TemplatePage/TemplatePage';
import FolderPage from '../FolderPage/FolderPage';
import ElementPage from '../ElementPage/ElementPage';
import TemplateElementPage from '../TemplateElementPage/TemplateElementPage';
import './BreadCrumbs.css';
import logo from '../App/logo4x.png';

class BreadCrumbs extends React.Component {
    constructor(props) {
      super(props)  
      this.UpdateHeader = this.UpdateHeader.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.ClickBreadCrumb = this.ClickBreadCrumb.bind(this)
      this.state={breadCrumbs:[
        {
          title: 'главная',
          path: '/main',  
          body: {
              "Mail":this.props.token.Mail,
              "Password":this.props.token.Password
          }            
        },
      ], currentbody:null, needupdate:false}
    }
  
    UpdateHeader(breadcrumbs) {
      this.setState({
        breadCrumbs: breadcrumbs, needupdate:false
      })
      // this.props.history.push("/projects");
    }
    handleClick(e) {
        e.preventDefault();
        this.props.history.push("/");
        localStorage.clear();    
        window.location.reload();      
      }
      // componentDidMount(){
      //   this.props.history.push("/main");
      // }
    ClickBreadCrumb= param => e => {
        e.preventDefault();
        const breadCrumbs = this.state.breadCrumbs;
        const index = breadCrumbs.map(function(e) { return e.body.Id; }).indexOf(param.body.Id);
        breadCrumbs.length=index+1;
        this.setState({breadCrumbs:breadCrumbs, needupdate:true});
        // this.props.history.push(param.path);     
      }
  
    render() {
      const breadCrumbs=this.state.breadCrumbs;
    
      return (
      <div>
        <div className="Header">
      <div className="BreadCrumbs">
      {breadCrumbs.map(bc=>
              <div key={bc.title} className="gt">                            
                  <Link className="BreadCrumb" to={{pathname:bc.path, state:{updated:true}}}>
                    <button className="BreadCrumb" onClick={this.ClickBreadCrumb(bc)}>
                    {bc.title}
                    </button>                    
                    </Link>
                    &ensp;&rarr;
              </div>)}
              </div>
              <div className="settingsinheader">
              {<button className="btn_logout" onClick={this.handleClick}>настройки</button>}
              {<button className="btn_logout" onClick={this.handleClick}>выход</button>}
              <img className="logo" src={logo} alt="toolbaritem"/>
              </div>
              </div>              
              <Router>
                      <Switch>                      
                      <Route path="/template" component={TemplatePage}>
                      <TemplatePage body={this.props.token} breadCrumbs={breadCrumbs} UpdateHeader={this.UpdateHeader}/>
                      </Route>                      
                      <Route path="/element" component={ElementPage}>
                        <ElementPage body={this.props.token} breadCrumbs={breadCrumbs} UpdateHeader={this.UpdateHeader}/>
                      </Route>
                      <Route path="/telement">
                        <TemplateElementPage body={this.props.token} breadCrumbs={breadCrumbs} UpdateHeader={this.UpdateHeader}/>
                      </Route>
                      <Route path="/main">
                        <MainPage body={this.props.token} breadCrumbs={breadCrumbs} UpdateHeader={this.UpdateHeader} NeedUpdate={this.state.needupdate}/>
                      </Route>     
                      <Route path="/projects">
                        <FolderPage breadCrumbs={breadCrumbs} NeedUpdate={this.state.needupdate} UpdateHeader={this.UpdateHeader}/>
                      </Route> 
                        <Redirect from="/" to={{pathname: `/main`}}></Redirect>          
                      </Switch>
                      </Router>
              </div>)
    }
  }
  export default withRouter(BreadCrumbs);