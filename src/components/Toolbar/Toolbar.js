import React, { useState } from 'react';
import addimg from './AddItem.png';
import addfolder from './AddFolder.png';
import deleteimg from './Delete.png';
import editimg from './Edit.png';
import exportimg from './Export.png';
import importimg from './Import.png';
import searchimg from './Search.png';
import settingsimg from './Settings.png';
import './Toolbar.css';

export default function Toolbar({typeof_parentel, parentid, userid}) {

    if(typeof_parentel=="template")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button><img src={addimg} /></button>
            <button><img src={addfolder} /></button>
            <button><img src={deleteimg} /></button>
            <button><img src={editimg} /></button>
            <button><img src={exportimg} /></button>
            <button><img src={importimg} /></button>
            <button><img src={searchimg} /></button>
            <button><img src={settingsimg} /></button>
            </div>
            </div>
          )
    }
    if(typeof_parentel=="mainpage")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button><img src={addimg} /></button>
            <button><img src={addfolder} /></button>
            <button><img src={deleteimg} /></button>
            <button><img src={editimg} /></button>
            <button><img src={exportimg} /></button>
            <button><img src={importimg} /></button>
            <button><img src={searchimg} /></button>
            <button><img src={settingsimg} /></button>
            </div>
            </div>
          )
    }
    if(typeof_parentel=="element")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button><img src={addimg} /></button>
            <button><img src={addfolder} /></button>
            <button><img src={deleteimg} /></button>
            <button><img src={editimg} /></button>
            <button><img src={exportimg} /></button>
            <button><img src={importimg} /></button>
            <button><img src={searchimg} /></button>
            <button><img src={settingsimg} /></button>
            </div>
            </div>
          )
    }

  
}