import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Toolbar from '../Toolbar/ToolBarTemplateElement';
import './TempateElementPage.css';

export default class TemplateElementPage extends Component{
    constructor(props){
        super(props); 
        this.state={templatecharacteristics: null, breadCrumbs:null, characteristics:null, savepath:null};
        this.handleClick = this.handleClick.bind(this);
    }    
    handleClick(e) {
        e.preventDefault();
        this.props.history.push("/");
        localStorage.clear();    
        window.location.reload();      
      }  
    
    async GetTemplateCharacteristics(parentid){
        const breadCrumbs = this.props.location.state.breadCrumbs; 
        const index = breadCrumbs.map(function(e) {if (e.path==='/telement') return e.body.Id; else return 0;}).indexOf(this.props.location.state.body.Id);
        // const index=breadCrumbs.indexOf(elem => elem.path==`/template/${this.props.match.params.id}/${this.props.match.params.name}`);
        if(index===-1)
        {
        breadCrumbs.push({
            title: this.props.location.state.body.Name,
            path: `/telement`,
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
        console.log(process.env.REACT_APP_API_TEMPLATECHARACTERISTICS+`?idelement=${parentid}`)
        await fetch(process.env.REACT_APP_API_TEMPLATECHARACTERISTICS+`?idelement=${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({templatecharacteristics:data, breadCrumbs:breadCrumbs});
        }).catch(err => console.log(err));  
        console.log(this.state);
    }
    GetCharacteristics(parentid){
        fetch(process.env.REACT_APP_API_TEMPLATECHARACTERISTICS+`/${parentid}`) 
        .then(response=>{ return response.json()})
        .then(data=>{
            this.setState({characteristics:data});
        }).catch(err => console.log(err));
    }

    async componentDidMount(){
        await this.GetTemplateCharacteristics(this.props.location.state.body.Id);
        await this.GetCharacteristics(this.props.location.state.body.Id);
    }
    async componentDidUpdate(prevProps){
    console.log("Я в обновлении темплэйта");
      if (prevProps.location.state.body.path !== this.props.location.state.body.path)      
      {
        await this.GetTemplateCharacteristics(this.props.location.state.body.Id);
        await this.GetCharacteristics(this.props.location.state.body.Id);
        // window.location.reload();
      }
  }

    render(){
        if ((!this.state.templatecharacteristics)||(!this.state.characteristics)) {
            return <div />
          }
        const {templatecharacteristics, characteristics,breadCrumbs}=this.state;//сначала
        const array = templatecharacteristics.map(function(item) {
            return {idparent: item.IdParent, name: item.NameParent};
          });
        var setObj = new Set(); // create key value pair from array of array

        var groups = array.reduce((acc,item)=>{
            if(!setObj.has(item.idparent)){
    setObj.add(item.idparent,item)
    acc.push(item)
  }
  return acc;
},[]);//converting back to array from mapobject     
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
                              &ensp;&rarr;&ensp;
                        </div>)}
                        </div> 
                        <Toolbar previouspages={breadCrumbs} typeof_parentel="templateelement" parent={this.props.location.state.body}></Toolbar>   
                        <div className="Characteristics">
                        {/* <Toolbar previouspages={breadCrumbs} typeof_parentel="template" parent={this.props.location.state.body}></Toolbar>         */}
                        {groups.map(group=>
                        <div key={group.idparent} className="Element">
                            {group.name}
                            {templatecharacteristics.filter(number => number.IdParent === group.idparent)
        .map(number => <div key={number.IdCharacter} className="Characteristic">{number.NameCharacter}: {number.ValueCharacter}</div>)}
                        </div>)} 

                        {characteristics.map(folder=>
                        <div key={folder.Id}>
                        {folder.Name}: {folder.Value}
                    </div>)} 
                        
                           
                        </div>  
                        </div>
        )
    }
}