import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteBook, getBookById, getLikesByBookId, getMyLikeBookId, likeBook } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            ${bookControlsTemplate(book, isOwner, onDelete)}
            ${likesControlsTemplates(showLikeButton, onLike)}
           
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>
            ${book.description}
        </p>
    </div>
</section>
`;

const bookControlsTemplate = (book, isOwner, onDelete) => {
    if (isOwner) {
        return html`
    <a class="button" href="/edit/${book._id}">Edit</a>
    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
    `;
    } else {
        return null;
    }
}

const likesControlsTemplates = (showLikeButton, onLike) => {
    if(showLikeButton) {
        return html`
        <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>
        `;
    } else {
        return null;
    }
}

export async function detailsPage(ctx) {
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    const userId = getUserData()?._id;
    const isOwner = book._ownerId === userId;
    const likes = await getLikesByBookId(bookId);
    const myLikes = userId && await getMyLikeBookId(bookId, userId);
    const showLikeButton = !isOwner && !myLikes && userId;
    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike));

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${book.title}?`);
        if (confirmed) {
            await deleteBook(bookId);
            ctx.page.redirect("/");
        }
    }

    async function onLike() {
        await likeBook(bookId);
        ctx.page.redirect(`/details/${bookId}`);
    }
}