import { dataRequest } from "./api/request.js";
import { createNavBtn } from "./create.js";
import { dashboardNavBtn } from "./dashboard.js";
import { homeSection } from "./home.js";
import { logoutNavBtn } from "./logout.js";
import { registerNavBtn } from "./register.js";
import {  getBtnByTextContent, showPage } from "./utils.js";

const loginNavBtn = getBtnByTextContent("a","Login")
const loginSection = document.querySelector("#login");

loginNavBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    showPage(loginSection,[dashboardNavBtn,loginNavBtn,registerNavBtn])
    const form = loginSection.querySelector("form");
    form.addEventListener("submit",async (event)=>{
        event.preventDefault()
        try {
                const {email,password} = Object.fromEntries(new FormData(form));
                const data = await dataRequest("http://localhost:3030/users/login","POST",{"Content-type":"application/json"},{email,password})
                localStorage.setItem("userInfo",JSON.stringify(data));
                showPage(homeSection,[dashboardNavBtn,createNavBtn,logoutNavBtn])
                form.reset()

        } catch (error) {
            alert(error.message)
        }

})
})
export{
    loginNavBtn,
    loginSection
}