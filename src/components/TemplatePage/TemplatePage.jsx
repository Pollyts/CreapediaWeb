import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './TemplatePage.css';
import Toolbar from '../Toolbar/Toolbar';

export default class TemplatePage extends Component{
    constructor(props){
        super(props); 
        this.state={folders:[], elements:[],  breadCrumbs:[]};
    }    
    
    GetFolders(parentid){
        const breadCrumbs = this.props.location.state.breadCrumbs; 
        const index = breadCrumbs.map(function(e) { return e.body.Id; }).indexOf(this.props.location.state.body.Id);
        // const index=breadCrumbs.indexOf(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
        if(index===-1)
        {
        breadCrumbs.push({
            title: this.props.location.state.body.Name,
            path: `/template`,
            body:{
                "Name":this.props.location.state.body.Name,
                "Id":this.props.location.state.body.Id
            }
          });
        }
        else
        {
            breadCrumbs.length=index+1;
        }
        fetch(process.env.REACT_APP_API_FOLDERS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({folders:data, breadCrumbs:breadCrumbs});
        }).catch(err => console.log(err));  
    }
    GetElements(parentid){
        fetch(process.env.REACT_APP_API_ELEMENTS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({elements:data});
        }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.GetFolders(this.props.location.state.body.Id);
        this.GetElements(this.props.location.state.body.Id);
    }
    componentDidUpdate(prevProps){
        console.log("Я тут");
      if (prevProps.location.state.body.Id !== this.props.location.state.body.Id)      
      {
        this.GetFolders(this.props.location.state.body.Id);
        this.GetElements(this.props.location.state.body.Id);
      }
  }

    render(){
        const {folders, elements,breadCrumbs}=this.state;//сначала
        return(
            <div>
                <div className='header2'>{breadCrumbs[breadCrumbs.length-1]?.title}</div>
                <div className="BreadCrumbs">
                {breadCrumbs.map(bc=>
                        <div key={bc.title} className="gt">                            
                            {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                            <Link className="BreadCrumb" to={{pathname:bc.path, state:{body:bc.body, breadCrumbs:breadCrumbs}}} >
                             {bc.title} 
                              </Link>
                              &gt;&gt;
                        </div>)}
                        </div>    
                        <Toolbar typeof_parentel="template" parent={this.props.location.state.body}></Toolbar>        
            <div className="login-wrapper">              
                        {folders.map(folder=>
                        <div key={folder.Id}>
                            {/* <Link to={{pathname: `/template/${folder.Id}/${folder.Name}`}}> */}
                            <Link to={{pathname:`/template`, state: {breadCrumbs:breadCrumbs, body:folder}}}>
                             <button className='buttonfolder'> 
                             {folder.Name}
                              </button>
                              </Link>
                        </div>)} 

                        {elements.map(folder=>
                        <div key={folder.Id} >
                            <Link to={{pathname: `/template/${folder.Id}`}} className="element">
                             {folder.Name}
                              </Link>
                        </div>)} 
                        
                           
                        </div>  
                        </div>
        )
    }
}