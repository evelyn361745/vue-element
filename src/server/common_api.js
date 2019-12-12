import axios from 'axios'

export let axios_config = () => {
    axios.defaults.baseURL = 'http://cangdu.org:8001/';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.defaults.timeout = 180000; //3min
}
axios_config();

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
})

//拦截响应数据
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
})

//get请求 
export const ajax_get = (url, data) => {
    return axios.get(url, {
        params: data,
    }).then(result => {
        return result;
    })
}

export const ajax_post = (url, data) => {
    return axios.request({
        url: url,
        method: 'post',
        params: data.params,
        data: data.data,
    }).then(result => {
        return result;
    })
}

export const ajax_delete = (url, data) => {
    return axios.request({
        url: url,
        method: 'delete',
        params: data,
    }).then(result => {
        return result;
    })
}

export const ajax_put = (url, data) => {
    return axios.request({
        url: url,
        method: 'put',
        params: data.params,
        data: data.data,
    }).then(result => {
        return result;
    })
}