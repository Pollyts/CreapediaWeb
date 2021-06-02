import React, { useState } from 'react';
import AddElement from '../ModalForms/AddElement';
import AddFolder from '../ModalForms/AddFolder';
import DeleteComponent from '../ModalForms/DeleteComponent';
import ExportComponent from '../ModalForms/ExportComponent';
import './Toolbar.css';

export default function Toolbar(props) {

    const [showAddElement, set_showAddElement] = useState(false);
    const [showAddFolder, set_showAddFolder] = useState(false);
    const [showDeleteComponent, set_showDeleteComponent] = useState(false);
    const [showExportComponent, set_showExportComponent] = useState(false);


    if((props.typeof_parentel==="folder")||(props.typeof_parentel==="templatefolder"))
    {
        return(
            <div className="Toolbar">
            <button onClick={() => set_showAddElement(true)}>Добавить элемент</button>
            <AddElement folder={props.parent} prevpages={props.previouspages} typeofcomponent={props.typeof_parentel} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button onClick={() => set_showAddFolder(true)}>Добавить папку</button>
            <AddFolder folder={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button onClick={() => set_showDeleteComponent(true)}>Удалить папку</button>
            <DeleteComponent prevpages={props.previouspages} component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showDeleteComponent(false)} show={showDeleteComponent}/>
            <button>Изменить папку</button>
            <button onClick={() => set_showExportComponent(true)}>Экспорт папки</button>
            <ExportComponent component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showExportComponent(false)} show={showExportComponent}/>
            <button>Импорт папки</button>
            </div>
          )
    }    
    if((props.typeof_parentel==="element")||(props.typeof_parentel==="templateelement"))
    {
        return(
            // <div className="LayoutCenter">
            // <div className="Toolbar">
            // <button title="Добавить элемент" onClick={() => set_showAddElement(true)}><img src={addimg} alt="toolbaritem"/></button>
            // <AddElement show={showAddElement}/>
            // <button title="Добавить папку"><img src={addfolder} alt="toolbaritem" /></button>
            // <AddFolder folder={props.parent} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            // <button><img src={deleteimg} alt="toolbaritem" title="Удалить папку"/></button>
            // <button><img src={editimg} alt="toolbaritem" title="Изменить папку"/></button>
            // <button><img src={exportimg} alt="toolbaritem" title="Экспорт папки"/></button>
            // <button><img src={importimg} alt="toolbaritem" title="Импорт компонента"/></button>
            // <button><img src={searchimg} alt="toolbaritem" title="Поиск"/></button>
            // <button><img src={settingsimg} alt="toolbaritem" title="Настройки"/></button>
            // </div>
            // </div>
            <div className="LayoutCenter">
            <div className="Toolbar">
            <button onClick={() => set_showAddElement(true)}>Добавить элемент</button>
            <AddElement folder={props.parent} prevpages={props.previouspages} typeofcomponent={props.typeof_parentel} onClose={()=>set_showAddElement(false)} show={showAddElement}/>
            <button onClick={() => set_showAddFolder(true)}>Добавить папку</button>
            <AddFolder folder={props.parent} prevpages={props.previouspages} onClose={()=>set_showAddFolder(false)} show={showAddFolder}/>
            <button onClick={() => set_showDeleteComponent(true)}>Удалить папку</button>
            <DeleteComponent prevpages={props.previouspages} component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showDeleteComponent(false)} show={showDeleteComponent}/>
            <button>Изменить папку</button>
            <button onClick={() => set_showExportComponent(true)}>Экспорт папки</button>
            <ExportComponent component={props.parent} typeofcomponent={props.typeof_parentel} onClose={()=>set_showExportComponent(false)} show={showExportComponent}/>
            <button>Импорт папки</button>
            </div>
            </div>
          )
    }

  
}