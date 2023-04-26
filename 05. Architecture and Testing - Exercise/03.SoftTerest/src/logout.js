import { dataRequest } from "./api/request.js";
import { dashboardNavBtn } from "./dashboard.js";
import { loginNavBtn } from "./login.js";
import { registerNavBtn } from "./register.js";
import { changeNavBtns, getBtnByTextContent, getNavSection, getUserDataFromLocalStorage } from "./utils.js";

const logoutNavBtn = getBtnByTextContent("a","Logout");
const logoutSection = document.querySelector("#logout");

logoutNavBtn.addEventListener("click",async(event)=>{
    event.preventDefault();
  const userInfo = getUserDataFromLocalStorage();
  if (!userInfo) {
    alert("User is not currently logged in");
    return;
  }
  try{
    await dataRequest("http://localhost:3030/users/logout","GET",{"X-Authorization":userInfo.accessToken})
  }catch(e){
    localStorage.removeItem("userInfo")
    changeNavBtns([dashboardNavBtn,loginNavBtn,registerNavBtn],getNavSection())
  }
})

export{
    logoutNavBtn,
    logoutSection
}