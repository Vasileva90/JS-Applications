import {post, get, put, del} from "./api.js";

export async function getAllBooks() {
    return get("/data/books?sortBy=_createdOn%20desc");
}

export async function createBook(book) {
    return post('/data/books', book);
}

export async function editBook(id, book) {
    return put(`/data/books/${id}`, book);
}

export async function getMyBooks(userId) {
    return get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export async function getBookById(id) {
    return get(`/data/books/${id}`);
}

export async function likeBook(bookId) {
    return post('/data/likes', {
        bookId
    });
}

export async function getLikesByBookId(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeBookId(bookId, userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function deleteBook(id){
    return del(`/data/books/${id}`);
}