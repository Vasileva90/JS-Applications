

function getDataSection(){
   return document.querySelector("#data");
}

function getBtnByTextContent(selector,textContent){
    return [...document.querySelectorAll(selector)].find(el=>el.textContent===textContent);
}

function changeNavBtns(btnsOnView,nav){
    nav.innerHTML=""
    for (const btn of btnsOnView) {
        nav.appendChild(btn)
    }
}

function showPage(section,btnsOnNav,update){
    const dataSection = getDataSection();
    dataSection.replaceChildren(section)
    
    changeNavBtns(btnsOnNav,getNavSection())
    if(update){
        update()
    }
}
function getNavSection(){
return document.querySelector(".navbar-nav")
}

function getUserDataFromLocalStorage(){
    return JSON.parse(localStorage.getItem("userInfo"));  
}


function createHTMLElement(type,attributes,textContent){
    const element = document.createElement(type);
    if(attributes){
        for (const key of Object.keys(attributes)) {
            element.setAttribute(key,attributes[key])
        }
    }
    if(textContent){
        element.textContent=textContent;
    }
    return element;
}





export{
    getDataSection,
    getBtnByTextContent,
    changeNavBtns,
    showPage,
    getUserDataFromLocalStorage,
    createHTMLElement,
    getNavSection
}