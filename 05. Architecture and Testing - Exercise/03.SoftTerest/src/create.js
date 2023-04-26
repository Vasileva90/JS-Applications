import { dataRequest } from "./api/request.js";
import { dashboardNavBtn, dashboardSection, loadAllIdeas } from "./dashboard.js";
import { logoutNavBtn } from "./logout.js";
import { getBtnByTextContent, getUserDataFromLocalStorage, showPage } from "./utils.js";

const createNavBtn = getBtnByTextContent("a","Create");
const createSection = document.querySelector("#postIdea");


createNavBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    showPage(createSection,[dashboardNavBtn,createNavBtn,logoutNavBtn])

    const form =document.querySelector("form");
    form.addEventListener("submit",async(e)=>{
        e.preventDefault()
        try {
            const {title,description,imageURL}=Object.fromEntries(new FormData(form));
            if(title.length<6||description.length<10||imageURL.length<5){
                throw new Error("Invalid inputs!")
            }
            const {accessToken} = getUserDataFromLocalStorage();
            console.log(accessToken);
            await dataRequest("http://localhost:3030/data/ideas","POST",{"X-Authorization":accessToken},{title,description,img:imageURL})
            form.reset();
            showPage(dashboardSection,[dashboardNavBtn,createNavBtn,logoutNavBtn],loadAllIdeas);
            
        } catch (error) {
            alert(error.message)
        }
    })
    
})
export{
    createNavBtn,
    createSection
}