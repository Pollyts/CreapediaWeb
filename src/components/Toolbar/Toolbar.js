import React, { useState } from 'react';
import addimg from './AddItem.png';
import AddElement from '../ModalForms/AddElement';
import AddFolder from '../ModalForms/AddFolder';
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
    const [showAddFolder, set_showAddFolder] = useState(false)


    if(props.typeof_parentel==="template")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button  title="Добавить элемент" onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            <AddElement folder={props.parent} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button title="Добавить папку" onClick={() => set_showAddFolder(true)}><img src={addfolder} alt="toolbaritem" /></button>
            <AddFolder folder={props.parent} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button><img src={deleteimg} alt="toolbaritem" title="Удалить папку"/></button>
            <button><img src={editimg} alt="toolbaritem" title="Изменить папку"/></button>
            <button><img src={exportimg} alt="toolbaritem" title="Экспорт папки"/></button>
            <button><img src={importimg} alt="toolbaritem" title="Импорт компонента"/></button>
            <button><img src={searchimg} alt="toolbaritem" title="Поиск"/></button>
            <button><img src={settingsimg} alt="toolbaritem" title="Настройки"/></button>
            </div>
            </div>
          )
    }
    if(props.typeof_parentel==="mainpage")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button  title="Добавить элемент" onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            <AddElement folder={props.parent} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button title="Добавить папку" onClick={() => set_showAddFolder(true)}><img src={addfolder} alt="toolbaritem" /></button>
            <AddFolder folder={props.parent} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button><img src={deleteimg} alt="toolbaritem" title="Удалить папку"/></button>
            <button><img src={editimg} alt="toolbaritem" title="Изменить папку"/></button>
            <button><img src={exportimg} alt="toolbaritem" title="Экспорт папки"/></button>
            <button><img src={importimg} alt="toolbaritem" title="Импорт компонента"/></button>
            <button><img src={searchimg} alt="toolbaritem" title="Поиск"/></button>
            <button><img src={settingsimg} alt="toolbaritem" title="Настройки"/></button>
            </div>
            </div>
          )
    }
    if(props.typeof_parentel==="element")
    {
        return(
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button title="Добавить элемент" onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            <AddElement show={showAddElement}/>
            <button title="Добавить папку"><img src={addfolder} alt="toolbaritem" /></button>
            <AddFolder folder={props.parent} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button><img src={deleteimg} alt="toolbaritem" title="Удалить папку"/></button>
            <button><img src={editimg} alt="toolbaritem" title="Изменить папку"/></button>
            <button><img src={exportimg} alt="toolbaritem" title="Экспорт папки"/></button>
            <button><img src={importimg} alt="toolbaritem" title="Импорт компонента"/></button>
            <button><img src={searchimg} alt="toolbaritem" title="Поиск"/></button>
            <button><img src={settingsimg} alt="toolbaritem" title="Настройки"/></button>
            </div>
            </div>
          )
    }

  
}