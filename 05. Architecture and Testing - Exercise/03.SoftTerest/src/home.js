import { createNavBtn } from "./create.js";
import { dashboardNavBtn } from "./dashboard.js";
import { loginNavBtn } from "./login.js";
import { logoutNavBtn } from "./logout.js";
import { registerNavBtn } from "./register.js";
import { getDataSection, getUserDataFromLocalStorage, showPage } from "./utils.js";

const homeNavBtn = document.querySelector(".navbar-brand")
const homeSection = document.querySelector("#home");

homeNavBtn.addEventListener("click",(event)=>{
    event.preventDefault()

    if(getUserDataFromLocalStorage()){
        showPage(homeSection,[dashboardNavBtn,createNavBtn,logoutNavBtn])
    }else{
        showPage(homeSection,[dashboardNavBtn,loginNavBtn,registerNavBtn])
    }
    
})




export{
    homeNavBtn,
    homeSection
}