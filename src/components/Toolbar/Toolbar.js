import React, { useState } from 'react';
import addimg from './AddItem.png';
import './Toolbar.css';

export default function Toolbar({typeof_parentel, parentid, userid}) {

    if(typeof_parentel=="template")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
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
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
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
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            <button><img src={addimg} /></button>
            </div>
            </div>
          )
    }

  
}