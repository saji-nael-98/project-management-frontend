import axios from 'axios'
const apiClient = axios.create({
    baseURL: '/api'
})

apiClient.interceptors.response.use(function (response) {
    if (response.status == 200) {
        return response.data
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
apiClient.interceptors.request.use(function (request) {
    if (localStorage.getItem("_auth")) {
        request.headers.Authorization = `Bearer ` + localStorage.getItem("_auth")
    }
    return request;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export { apiClient }