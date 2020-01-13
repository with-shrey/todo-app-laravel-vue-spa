import axios from "axios";

export default () => {
    let token = document.head.querySelector('meta[name="csrf-token"]');
    token = token.getAttribute('content');
    const accessToken = localStorage.getItem('access_token');
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token,
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return axios.create({
        baseURL: '/api',
        headers
    });
}
