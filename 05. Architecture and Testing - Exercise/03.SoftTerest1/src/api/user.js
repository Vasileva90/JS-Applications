import * as api from './api.js'

const nav = {
    "register": "users/register",
    "user": "users/login",
    "logout": "users/logout"
}

export async function login (email, password){
    const user = await api.post(nav.user, {email, password});

    sessionStorage.setItem('user', JSON.stringify(user));
}

export async function register (email, password){
    const user = await api.post(nav.register, {email, password});

    sessionStorage.setItem('user', JSON.stringify(user));
}
export async function logout (){
    api.get(nav.logout);
    sessionStorage.removeItem("user");
}