import React, {Component} from 'react';
import './MainPage.css';

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
            <div>
            
                        {deps.map(dep=>
                             <button key={dep.Id} > 
                             {dep.Name}
                              </button>)}
            </div>
        )
    }
}