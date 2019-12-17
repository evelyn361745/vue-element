<template>
    <div id="shoplist">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <router-link
                :to="{
                    path: 'shop',
                    query: {
                        geohash,
                        id: item.id
                    }
                }"
                v-for="item in shoplistArr"
                :key="item.id"
                class="shop_li">
                <van-image 
                    :src="imgBaseUrl + item.image_path"
                    class="shop_img">
                </van-image>
                <div class="shop_right">
                    <div class="shop_detail_header">
                        <h4 
                            :class="item.is_premium? 'premium': ''"
                            class="shop_title ellipsis"
                            >{{item.name}}</h4>
                        <ul class="shop_detail_ul">
                            <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
                        </ul>
                    </div>
                    <div class="rating_order_num">
                        <div class="rating_order_num_left">
                            <div class="rating_section">
                                <el-rate
                                    v-model="item.rating"
                                    disabled
                                    show-score
                                    text-color="#ff9a0d"
                                    score-template="{value}">
                                </el-rate>
                            </div>
                            <div class="order_section">
                                月售{{item.recent_order_num}}单
                            </div>
                        </div>
                        <div class="rating_order_num_right">
                            <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
                            <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
                        </div>
                    </div>
                    <div class=" fee_distance">
                        <p class="fee">
                            ￥{{item.float_minimum_order_amount}}起送
                            <span class="segmentation">/</span>
                            {{item.piecewise_agent_fee.tips}}
                        </p>
                        <p class="distance_time">
                            <span v-if="Number(item.distance)">
                                {{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km': item.distance + "m"}}
                            </span>
                            <span v-else>{{item.distance}}</span>
                            <span class="segmentation">/</span>
                            <span class="order_time">{{item.order_lead_time}}</span>
                        </p>
                    </div>
                </div>
            </router-link>
        </van-list>
    </div>
</template>
<script>
import {ajax_shoplist} from '../../server/msite_api'
export default {
    data() {
        return {
            shoplistArr: [],
            loading: false,
            finished: false,
            latitude: '39.936711',
            longitude: '116.454905',
            offset: '0',
            restaurantCategoryId: '',
            imgBaseUrl: '//elm.cangdu.org/img/',
        }
    },
    props: ['geohash'],
    mounted() {
        this.initData();
    },
    methods: {
        async initData() {
            let res = await ajax_shoplist(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
            console.log(res.data);
            this.shoplistArr = res.data;
            this.loading = false;
            if(this.shoplistArr.length >= 20) {
                this.finished = true;
            }
        },
        onLoad() {

        },
        zhunshi(supports){
			let zhunStatus;
			if ((supports instanceof Array) && supports.length) {
 				supports.forEach(item => {
 					if (item.icon_name === '准') {
 						zhunStatus = true;
 					}
 				})
			}else{
				zhunStatus = false;
			}
			return zhunStatus
		},
    }
}
</script>

<style lang="scss" scoped>
#shoplist {
    background-color: #fff;
    .shop_li {
        width: 100%;
        height: 100px;
        display: flex;
        border-bottom: 0.025rem solid #f1f1f1;
        padding: 8px 8px;
        .shop_img {
            width: 64px;
            height: 64px;
        }
        .shop_right {
            flex: auto;
            .shop_detail_header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .premium::before {
                    content: '品牌';
                    display: inline-block;
                    background-color: #ffd930;
                    color: #333;
                    border-radius: 0.1rem;
                    margin-right: 0.2rem;
                    padding: 0 0.1rem;
                    font-size: 12px;
                    line-height: 12px;
                }
                .shop_title {
                    color: #333;
                    font-size: 14px;
                    font-weight: 700;
                    margin-left: 8px;
                }
                .shop_detail_ul {
                    display: flex;
                    .supports {
                        color: #999;
                        border: 0.025rem solid #f1f1f1;
                        border-radius: 0.08rem;
                        margin-left: 0.2rem;
                        font-size: 10px;
                    }
                }
            }
            .rating_order_num {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                margin-left: 8px;
                padding-top: 16px;
                .rating_order_num_left {
                    display: flex;
                    justify-content: flex-start;
                    .order_section {
                        font-size: 12px;
                        margin-left: 8px;
                    }
                }
                .rating_order_num_right {
                    display: flex;
                    justify-content: flex-end;
                    .delivery_style {
                        font-size: 10px;
                        border-radius: 0.08rem;
                        margin-left: 0.08rem;
                        padding: 2px;
                    }
                    .delivery_left {
                        color: #fff;
                        background-color: #3190e8;
                        border: 0.025rem solid #3190e8;
                    }
                    .delivery_right {
                        color: #3190e8;
                        border: 0.025rem solid #3190e8;
                    }
                }
            }
            .fee_distance {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #666;
                padding-left: 8px;
                padding-top: 8px;
                .order_time {
                    color: #3190e8;
                }
            }
        }
    }
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
}
</style>
<style lang="less">
.el-rate__icon {
    font-size: 12px;
    margin-right: 0;
}
.el-rate__text {
    font-size: 12px;
    vertical-align: middle;
    margin-left: 8px;
}
</style>