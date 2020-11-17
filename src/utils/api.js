import axios from 'axios';
import {Message} from 'element-ui';

//响应拦截器
axios.interceptors.response.use(success => {
    if (success.status && success.status == 200 && success.data.status == 500) {
        Message.error({mssage: success.data.msg});
        return;
    }
    return success.data;
}, error => {
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器没了'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        Message.error({message: '尚未登陆，请登录'})
    } else {
        if (error.response.data.msg) {
            //    服务端返回的信息
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误'})
        }
    }
    return;
})

let base = '';

export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        //  注意下面url后面不是单引号，而是键盘1前面的符号  用来引用base变量，如果是单引号就是死的字符串了，，注意
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            console.log(ret);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
//封装一个传递json的post方法
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    })
}