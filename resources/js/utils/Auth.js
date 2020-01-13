import HTTP from "./HTTP";
import {ACCESS_TOKEN, USER} from "./constants";

export function login(data) {
    console.log(data, data.user, data.user.api_token);
    const user = data.user;
    const token = data.user.api_token;
    localStorage.setItem(ACCESS_TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
}

export async function logout() {
    const response = await HTTP().get('/logout');
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(USER);
}

export function isAuthenticated() {
    return !!localStorage.getItem(ACCESS_TOKEN);
}
