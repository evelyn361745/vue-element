import {
    ajax_get,
    ajax_post,
    ajax_put,
    ajax_delete
} from './common_api.js'

//获取msite页面地址信息
export const ajax_msiteAddress = geohash => ajax_get('/v2/pois/'+ geohash);

/**
 * 获取msite页面食品分类列表
 */
export const ajax_msiteFoodTypes = data => ajax_get('/v2/index_entry', data)

/**
 * 获取商品列表
 */
export const ajax_shoplist = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';
    support_ids.forEach(item => {
        if (item.status) {
			supportStr += '&support_ids[]=' + item.id;
		}
    })
    let data = {
		latitude,
		longitude,
		offset,
		limit: '20',
		'extras[]': 'activities',
		keyword: '',
		restaurant_category_id,
		'restaurant_category_ids[]': restaurant_category_ids,
		order_by,
		'delivery_mode[]': delivery_mode + supportStr
	};
	return ajax_get('/shopping/restaurants', data);
}