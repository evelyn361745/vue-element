import {
    ajax_get,
    ajax_post,
    ajax_put,
    ajax_delete
} from './common_api.js'

//获取首页热门城市
export const ajax_currentcity = (number, data) => ajax_get('/v1/cities/'+number, data);

export const ajax_searchplace = data => ajax_get('/v1/pois', data)