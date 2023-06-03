import {put, get} from "../api.js";
import { render, html } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs";


const editTemplate = (furniture) => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Edit Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit="${onSubmit}" id="${furniture._id}">
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control" id="new-make" type="text" name="make" value="${furniture.make}">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control" id="new-model" type="text" name="model" value="${furniture.model}">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control" id="new-year" type="number" name="year" value="${furniture.year}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description" value="${furniture.description}">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price" value="${furniture.price}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img" value="${furniture.img}">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material" value="${furniture.material}">
                </div>
                <input type="submit" class="btn btn-info" value="Edit" />
            </div>
        </div>
    </form>
`

export async function editView(context) {
    console.log(context)
    let data = await get(`/data/catalog/${context.params.id}`);
    console.log(data);
    render(editTemplate(data), document.querySelector('.container'));
}

function onSubmit(event) {
    event.preventDefault();
    let make = document.getElementById('new-make');
    let price = document.getElementById('new-price');
    let model = document.getElementById('new-model');
    let image = document.getElementById('new-image');
    let year = document.getElementById('new-year');
    let material = document.getElementById('new-material');
    let description = document.getElementById('new-description');
    let id = document.querySelector('form').id;
    let isValid = true;

    make.value.length >= 4 ? validate(make, true) : validate(make, false);
    Number(price.value) > 0 ? validate(price, true) : validate(price, false);
    model.value.length >= 4 ? validate(model, true) : validate(model, false);
    image.value !== '' ? validate(image, true) : validate(image, false);
    (Number(year.value) >= 1950 && Number(year.value) <= 2050 )? validate(year, true) : validate(year, false);
    description.value.length > 10 ? validate(description, true) : validate(description, false);

    let data = {
        make: make.value,
        price: price.value,
        model:model.value,
        img: image.value,
        year: year.value,
        material:material.value,
        description:description.value,
    }

    function validate(element, boolean) {
        if(boolean === false) {
            isValid = false;
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
        } else {
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        }
    }
    if (isValid) {
        put(`/data/catalog/${id}`, data);
        page.redirect('/');

    }

}