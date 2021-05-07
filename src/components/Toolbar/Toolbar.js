import React, { useState } from 'react';
import addimg from './AddItem.png';
import AddElement from '../ModalForms/AddElement';
import addfolder from './AddFolder.png';
import deleteimg from './Delete.png';
import editimg from './Edit.png';
import exportimg from './Export.png';
import importimg from './Import.png';
import searchimg from './Search.png';
import settingsimg from './Settings.png';
import './Toolbar.css';

export default function Toolbar(props) {

    const [showAddElement, set_showAddElement] = useState(false)
    // const [showAddFolder, set_showAddFolder] = useState(false)


    if(props.typeof_parentel==="template")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            <AddElement show={showAddElement}/>
            <button><img src={addfolder} alt="toolbaritem"/></button>
            <button><img src={deleteimg} alt="toolbaritem"/></button>
            <button><img src={editimg} alt="toolbaritem"/></button>
            <button><img src={exportimg} alt="toolbaritem"/></button>
            <button><img src={importimg} alt="toolbaritem"/></button>
            <button><img src={searchimg} alt="toolbaritem"/></button>
            <button><img src={settingsimg} alt="toolbaritem"/></button>
            </div>
            </div>
          )
    }
    if(props.typeof_parentel==="mainpage")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            <AddElement folder={props.parent} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button><img src={addfolder} alt="toolbaritem"/></button>
            <button><img src={deleteimg} alt="toolbaritem"/></button>
            <button><img src={editimg} alt="toolbaritem"/></button>
            <button><img src={exportimg} alt="toolbaritem"/></button>
            <button><img src={importimg} alt="toolbaritem"/></button>
            <button><img src={searchimg} alt="toolbaritem"/></button>
            <button><img src={settingsimg} alt="toolbaritem"/></button>
            </div>
            </div>
          )
    }
    if(props.typeof_parentel==="element")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            <AddElement onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button><img src={addfolder} alt="toolbaritem"/></button>
            <button><img src={deleteimg} alt="toolbaritem"/></button>
            <button><img src={editimg} alt="toolbaritem"/></button>
            <button><img src={exportimg} alt="toolbaritem"/></button>
            <button><img src={importimg} alt="toolbaritem"/></button>
            <button><img src={searchimg} alt="toolbaritem"/></button>
            <button><img src={settingsimg} alt="toolbaritem"/></button>
            </div>
            </div>
          )
    }

  
}