import { delete_, get, post, put } from "./api.js";

const endpoints = {
    allOffers: '/data/offers?sortBy=_createdOn%20desc',
    allOffersCreate: '/data/offers',
    offerById: '/data/offers/',
    apply: '/data/applications'
};

export async function getAll(){
    return get(endpoints.allOffers)
}

export async function getById(id){
    return get(endpoints.offerById + id)
}

export async function create(data){
    return post(endpoints.allOffersCreate, data)
}

export async function update(id, data){
    return put(endpoints.offerById + id, data)
}

export async function del(id){
    delete_(endpoints.offerById + id)
}

export async function applyToOffer(offerId){
    return post(endpoints.apply, {offerId})
}

export async function checkApplys(offerId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function checkUserApply(offerId, userId){
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}