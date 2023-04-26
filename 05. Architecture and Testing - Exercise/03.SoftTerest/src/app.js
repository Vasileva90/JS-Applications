import { createNavBtn } from "./create.js";
import { dashboardNavBtn } from "./dashboard.js";
import { homeNavBtn, homeSection } from "./home.js";
import { loginNavBtn, loginSection } from "./login.js";
import { logoutNavBtn } from "./logout.js";
import { registerNavBtn, registerUser } from "./register.js";
import { changeNavBtns, getDataSection, getUserDataFromLocalStorage, showPage } from "./utils.js";



if(getUserDataFromLocalStorage()){
    showPage(homeSection,[dashboardNavBtn,createNavBtn,logoutNavBtn])
}else{
    showPage(homeSection,[dashboardNavBtn,loginNavBtn,registerNavBtn])
}

window.api={
    registerUser,
}

