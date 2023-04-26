import { dataRequest } from "./api/request.js";
import { createNavBtn } from "./create.js";
import { dashboardNavBtn, dashboardSection, loadAllIdeas } from "./dashboard.js";
import { loginNavBtn } from "./login.js";
import { logoutNavBtn } from "./logout.js";
import { registerNavBtn } from "./register.js";
import { createHTMLElement, getUserDataFromLocalStorage, showPage } from "./utils.js"

const recipeSection = document.querySelector("#recipe");

async function showRecipeIdea(id) {
    const data = await dataRequest(`http://localhost:3030/data/ideas/${id}`);
    
    const userData = getUserDataFromLocalStorage();
    
    let userId=""
    if (userData) {
        showPage(recipeSection, [dashboardNavBtn, createNavBtn, logoutNavBtn])
         userId = userData._id;
    } else {
        showPage(recipeSection, [dashboardNavBtn, loginNavBtn, registerNavBtn])
    }
    recipeSection.innerHTML = `
<div class="container home some">
        <img class="det-img" src="${data.img}" />
        <div class="desc">
            <h2 class="display-5">${data.title}</h2>
            <p class="infoType">Description:</p>
            <p class="idea-description">${data.description}</p>
        </div>
        <div class="text-center">
        
        </div>
    </div>
`


if(userData&&userId===data._ownerId){

    const deleteBtn = createHTMLElement("a", { class: "btn detb", href: "" }, "Delete");
    deleteBtn.addEventListener("click", async (e) => {
        e.preventDefault()
        await dataRequest(`http://localhost:3030/data/ideas/${data._id}`, "DELETE", { "X-Authorization": getUserDataFromLocalStorage().accessToken })
        showPage(dashboardSection, [dashboardNavBtn, createNavBtn, logoutNavBtn],loadAllIdeas)
    })
    const div = document.querySelector(".text-center")
    div.appendChild(deleteBtn)
}
}


export {
    recipeSection,
    showRecipeIdea
}