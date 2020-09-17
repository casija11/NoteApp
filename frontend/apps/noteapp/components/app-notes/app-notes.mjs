/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

let ind;
const display_table= async (resp)=> {

    let html = "<table style='border-collapse: collapse;'>";
    for (let i = 0; i < resp.results.notes.length; i++) {
        html+="<tr>";
        html+=`<td id='note_id${i}' style='display:none;'>`+resp.results.notes[i]._id+"</td>";
        html+=`<td id='note_title${i}' style= 'border: 1px solid #ddd; padding: 8px;'>`+resp.results.notes[i].title+"</td>";
        html+=`<td id='note_content${i}'style='border: 1px solid #ddd;padding: 8px;'>`+resp.results.notes[i].content+"</td>";
        html+=`<td style= 'border: 1px solid #ddd; padding: 8px;'><button onclick="monkshu_env.components['app-notes'].updatenote(${i})">Update</button></td>`; 
        html+="<td style= 'border: 1px solid #ddd; padding: 8px;'>"+`<button id ="delete${i}" onclick="monkshu_env.components['app-notes'].deletenote(${i})">Delete</button></td>`;
        html+="</tr>";
    }
    html+="</table>";
    app_notes.shadowRoot.querySelector("#printnote").innerHTML=html;
}
const createnote = async () => {
    const title=app_notes.shadowRoot.querySelector("#title").value;
    const content=app_notes.shadowRoot.querySelector("#note").value;
    const _id=app_notes.shadowRoot.querySelector("#id").value;
    const obj={
        _id:_id,
        title:title,
        content:content
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_CREATE, "POST", obj , false, true);
    if (!resp || !resp.result) router.reload();
    console.log(resp.results);
    ind=-1;
    app_notes.shadowRoot.querySelector("#title").value="";
    app_notes.shadowRoot.querySelector("#note").value="";
    app_notes.shadowRoot.querySelector("#id").value="";
    app_notes.shadowRoot.querySelector("#create-note").value="Create Note!";  
    display_table(resp);
}
const getnote = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_GETNOTE, "GET", {}, true);
    console.log(resp.results);
    if (!resp || !resp.result) router.reload();
    display_table(resp);
}
const deletenote = async (index) => {
    const _id=app_notes.shadowRoot.querySelector("#note_id"+index).innerHTML;
    const title=app_notes.shadowRoot.querySelector("#note_title"+index).innerHTML;
    const content=app_notes.shadowRoot.querySelector("#note_content"+index).innerHTML;
    const obj={
        _id:_id,
        title:title,
        content:content
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETE, "GET", obj ,true);
    console.log(resp.results);
    if (!resp || !resp.result) router.reload();
    display_table(resp);
    if(ind>=0)
    disable_button(ind);
}
const disable_button= (ind)=>{
    app_notes.shadowRoot.querySelector("#delete"+ind).disabled=true;
}
const updatenote = async (index) => {
    if(app_notes.shadowRoot.querySelector("#title").value)
    {
        alert("Update first!");
    }
    else
    {
        const _id=app_notes.shadowRoot.querySelector("#note_id"+index).innerHTML;
        const title=app_notes.shadowRoot.querySelector("#note_title"+index).innerHTML;
        const content=app_notes.shadowRoot.querySelector("#note_content"+index).innerHTML;
        app_notes.shadowRoot.querySelector("#title").value=title;
        app_notes.shadowRoot.querySelector("#note").value=content;
        app_notes.shadowRoot.querySelector("#id").value=_id;
        app_notes.shadowRoot.querySelector("#create-note").value="Save!";
        ind=index;
        disable_button(ind);
    }    
}

function register() {
    // convert this all into a WebComponent so we can use it
    
    monkshu_component.register("app-notes", `${APP_CONSTANTS.APP_PATH}/components/app-notes/app-notes.html`, app_notes);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_notes = { trueWebComponentMode, register, createnote, getnote, deletenote, updatenote }
