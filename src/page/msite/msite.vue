<template>
    <div id="msite">
        <head-top :headTitle="msiteTitle">
            <van-icon name="search" slot="left"></van-icon>
            <div slot="right">登录|注册</div>
        </head-top>
        <div class="msite_nav">
            <van-swipe class="swipe_container" 
                v-if="foodTypes.length" 
                :autoplay="5000"
                >
                <div class="swipe-wrapper">
                    <van-swipe-item 
                        v-for="(item, index) in foodTypes" 
                        :key="index">
                        <router-link 
                            :to="{
                                path: '/food', 
                                query: {
                                    geohash,title:foodItem.title, 
                                    restaurant_category_id: getCategoryId(foodItem.link)
                                }
                            }" 
                            v-for="foodItem in item" 
                            :key="foodItem.id"
                            class="link_to_food">
                            <figure>
                                <van-image 
                                    :src="imgBaseUrl + foodItem.image_url" 
                                    width="1.8rem" 
                                    height="1.8rem"
                                ></van-image>
                                <figcaption>{{foodItem.title}}</figcaption>
                            </figure>
                        </router-link>
                    </van-swipe-item>
                </div>
            </van-swipe>
        </div>
        <div class="shop_list_container">
            <div class="shop_header">
                <van-icon 
                    name="shop-o" 
                    slot="left" 
                    class="shop_icon"
                ></van-icon>
                <span class="shop_header_title">附近商家</span>
            </div>
            <shop-list
                :geohash="geohash"
            ></shop-list>
        </div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import footGuide from '../../components/footer/footGuide.vue'
import headTop from '../../components/header/head.vue'
import shopList from '../../components/common/shoplist'
import {
    ajax_msiteAddress,
    ajax_msiteFoodTypes
} from '../../server/msite_api.js'
import {ajax_guesscity_list} from '../../server/home_api.js'
export default {
    data() {
        return {
            geohash: '', // city页面传递过来的地址geohash
            msiteTitle: '请选择地址...', // msite页面头部标题
            foodTypes: '', // 食品分类列表
            hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
            imgBaseUrl: 'https://fuss10.elemecdn.com', // 图片域名地址
        }
    },
    components: {
        footGuide,
        headTop,
        shopList
    },
    async beforeMount() {
        if (!this.$route.query.geohash) {
            const address = await ajax_guesscity_list();
            this.geohash = address.latitude + ',' + address.longitude;
        }else {
            this.geohash = this.$route.query.geohash;
        }
        let res = await ajax_msiteAddress(this.geohash);
        this.msiteTitle = res.data.name;
        this.hasGetData = true;
    },
    mounted() {
        /**
         * 获取导航食品类型列表
         */
        let sub_data = {
            geohash: this.geohash,
            group_type: '1',
            'flags[]': 'F'

        }
        ajax_msiteFoodTypes(this.geohash).then(result => {
            result = result.data;
            let resLength = result.length;
            let foodArr = [];
            for(let i = 0, j=0; i < resLength; i+=8, j++) {
                foodArr[j] = result.splice(0, 8);
            }
            this.foodTypes = foodArr;
            //console.log(this.foodTypes)
        })
    },
    methods: {
        getCategoryId(url) {
            let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));
            //console.log(urlData)
            if (/restaurant_category_id/gi.test(urlData)) {
                return JSON.parse(urlData).restaurant_category_id.id;
            }else {
                return ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#msite {
    .msite_nav {
        padding-top: 3.1rem;
        background-color: #fff;
        border-bottom: 0.025rem solid #e4e4e4;
        height: 12.8rem;
        .swipe_container {
            height: 100%;
            .swipe-wrapper {
                padding-top: 16px;
                .van-swipe-item {
                    display: flex;
                    flex-wrap: wrap;
                    .link_to_food {
                        padding-bottom: 16px;
                        width: 25%;
                        font-size: 12px;
                        color: #666;
                        text-align: center;
                    }
                }
            }
            
        }
    }
    .shop_list_container {
        padding-top: 12px;
        .shop_header {
            background-color: #fff;
            height: 36px;
            padding-top: 8px;
            .shop_icon {
                vertical-align: middle;
                color: #999;
                size: 16px;
                padding-left: 8px;
            }
            .shop_header_title {
                color: #999;
                font-size: 12px;
            }
        }
    }
}
</style>