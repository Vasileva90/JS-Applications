import * as request from './request.js';

const baseUrl = 'http://localhost:3030';
const recipesUrl = `${baseUrl}/data/recipes`;
const loginUrl = `${baseUrl}/users/login`;

export const getRecipes = () => request.get(recipesUrl);

export const createRecipe = (recipeData) => request.post(recipesUrl, recipeData);

export const login = (email, password) => request.post(loginUrl, { email, password });
