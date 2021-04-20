import http from './httpService';
import jwtDecode from 'jwt-decode';
import { apiUrl } from '../config.json';

const api = apiUrl + 'auth';
const tokenkey = 'token';
export async function login(email, password) {
    const { data: jwt } = await http.post(api, { email, password });
    localStorage.setItem(tokenkey, jwt)
}

http.setJwt(getJwt())

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenkey, jwt)
}

export function logout() {
    localStorage.removeItem(tokenkey)
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenkey);
        return  jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenkey)
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}