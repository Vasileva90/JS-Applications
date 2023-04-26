import { dataRequest } from "./api/request.js";
import { createNavBtn } from "./create.js";
import { dashboardNavBtn } from "./dashboard.js";
import { homeSection } from "./home.js";
import { loginNavBtn } from "./login.js";
import { logoutNavBtn } from "./logout.js";
import { getBtnByTextContent, showPage } from "./utils.js";

const registerNavBtn = getBtnByTextContent("a","Register")
const registerSection = document.querySelector("#register");

async function registerUser(event){
        event.preventDefault()
        try {
                const form = registerSection.querySelector("form");
                const {email,password,repeatPassword} = Object.fromEntries(new FormData(form));
                if(email.length<3||password.length<3||password!==repeatPassword){
                throw new Error("Invalid inputs!");
                }
                const data = await dataRequest("http://localhost:3030/users/register","POST",{},{email,password});
                localStorage.setItem("userInfo",JSON.stringify(data));
                showPage(homeSection,[dashboardNavBtn,createNavBtn,logoutNavBtn])

        } catch (error) {
            alert(error.message)
        }
    }
registerNavBtn.addEventListener("click",(event)=>{
    event.preventDefault()
        showPage(registerSection,[dashboardNavBtn,loginNavBtn,registerNavBtn])
        const form = registerSection.querySelector("form");
        form.addEventListener("submit",registerUser);
})



export{
    registerNavBtn,
    registerSection,
    registerUser
}