import { dataRequest } from "./api/request.js";
import { createNavBtn } from "./create.js";
import { loginNavBtn } from "./login.js";
import { logoutNavBtn } from "./logout.js";
import { recipeSection, showRecipeIdea } from "./recipe.js";
import { registerNavBtn } from "./register.js";
import {  createHTMLElement, getBtnByTextContent, getUserDataFromLocalStorage, showPage } from "./utils.js";
async function loadAllIdeas(){
    const data =  await dataRequest("http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc");
    const ideasHolder = document.querySelector("#dashboard-holder")
    const noIdeaH1 = getBtnByTextContent("h1","No ideas yet! Be the first one :)");
    ideasHolder.innerHTML=""
    const userData = getUserDataFromLocalStorage()
    if(data){
        for (const currentIdea of data) {
           const divCard = createHTMLElement("div",{class:"card overflow-hidden current-card details",style:"width: 20rem; height: 18rem;"})
                const cardBodyDiv = createHTMLElement("div",{class:"card-body"})
                    const p = createHTMLElement("p",{class:"card-text"},currentIdea.title)
                const img = createHTMLElement("img",{class:"card-image",src:currentIdea.img,alt:"Card image cap"})
                const a = createHTMLElement("a",{class:"btn","data-id":currentIdea._id},"Details")
                a.addEventListener("click",(e)=>{
                    e.preventDefault()
                    const id = e.target.dataset.id;
                    showRecipeIdea(id)
                })
    
                cardBodyDiv.appendChild(p)
                divCard.appendChild(cardBodyDiv)
                divCard.appendChild(img)
                divCard.appendChild(a)
    
            ideasHolder.appendChild(divCard)
        }
    }else{
        ideasHolder.appendChild(noIdeaH1)
    }
}

const dashboardNavBtn = getBtnByTextContent("a","Dashboard")
const dashboardSection = document.querySelector("#dashboard");

dashboardNavBtn.addEventListener("click",async (event)=>{
    event.preventDefault()
    if(getUserDataFromLocalStorage()){
        showPage(dashboardSection,[dashboardNavBtn,createNavBtn,logoutNavBtn])
    }else{
        showPage(dashboardSection,[dashboardNavBtn,loginNavBtn,registerNavBtn])
    }
    loadAllIdeas()
})
export{
    dashboardNavBtn,
    dashboardSection,
    loadAllIdeas
}