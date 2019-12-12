import {
    ajax_get,
    ajax_post,
    ajax_put,
    ajax_delete
} from './common_api.js'

//获取首页默认地址
export const ajax_guesscity_list = data => ajax_get('/v1/cities?type=guess', data)

//获取首页热门城市
export const ajax_hotcity_list = data => ajax_get('/v1/cities?type=hot', data);

//获取首页所有城市
export const ajax_groupcity_list = data => ajax_get('/v1/cities?type=group', data);