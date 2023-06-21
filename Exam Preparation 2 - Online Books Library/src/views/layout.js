import { html } from "../../node_modules/lit-html/lit-html.js";


export const layoutTemplate = (userData, content) => html`
<header id="site-header">
            <!-- Navigation -->
            <nav class="navbar">
                <section class="navbar-dashboard">
                    <a href="/">Dashboard</a>
                    ${
                        !userData ? html` <!-- Guest users -->
                        <div id="guest">
                        <a class="button" href="/login">Login</a>
                        <a class="button" href="/register">Register</a>
                        </div>` 
                        : html` <!-- Logged-in users -->
                        <div id="user">
                        <span>Welcome, ${userData.email}</span>
                        <a class="button" href="/my-books">My Books</a>
                        <a class="button" href="/create">Add Book</a>
                        <a class="button" href="/logout">Logout</a>
                    </div>`}  
                </section>
            </nav>
        </header>
<main id="site-content">${content}</main>
<footer id="site-footer">
    <p>@OnlineBooksLibrary</p>
</footer>`;
