//изграждане на базова функция за извършване на заявки
import { url } from "../js/requestURL.js";
import { clearUserData, getUserData } from "./util.js";

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    //Authorization

    const userData = getUserData();
    if(userData !== null){
        options.headers['X-Authorization'] = userData.accessToken;
    }
    
    
    try {
        //правим заявка
        const response = await fetch(url, options)

        let result;

        //ако резултата от заявката не е празна
        if (response.status !== 204) {
            // при успешна заявка
            result = await response.json()
        }
        //ако заявката не е преминала успешно
        if (response.ok !== true) {
            // ако имаме невалиден токен
            if (response.status === 403) {
                clearUserData();
            }
            throw result;
        }
        //връщаме резултата от заявката
        return result;

    } catch (error) {
        alert(error.message);
        throw error;
    }
}

export const get = request.bind(null, 'get');
export const post = request.bind(null, 'post');
export const put = request.bind(null, 'put');
export const del = request.bind(null, 'delete');


/// USAGE

/* 
const data = await getData();
import {get} from 'get function folder'
export async function getData(){
    return get('url.get for required request')
}

*/