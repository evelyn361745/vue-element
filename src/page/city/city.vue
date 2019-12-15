<template>
    <div id="city">
        <head-top :headTitle="cityname">
            <div slot="left" >
                <van-icon name="arrow-left" @click="goHome"></van-icon>
                <span @click="goHome">返回</span>
            </div>
            <div slot="right">
                <span @click="goHome">切换城市</span>
            </div>
        </head-top>
        <form class="city_form" v-on:submit.prevent>
            <div>
                <input 
                    type="search"
                    name="city"
                    placeholder="输入学校、商务楼、地址"
                    class="city_input"
                    required
                    v-model="inputValue">
            </div>
            <div>
                <input
                    type="submit"
                    name="submit"
                    class="city_submit"
                    @click="postpois"
                    value="提交">
            </div>
        </form>
        <div v-if="historytitle" class="pois_search_history">搜索历史</div>
        <ul class="getpois_ul">
            <li v-for="(item, index) in placelist"
                @click="nextpage(index, item.geohash)"
                :key="index"
            >
                <h4 class="pois_name ellipsis">{{item.name}}</h4>
                <p class="pois_address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <div v-if="historytitle&&placelist.length" 
            class="clear_all_history"
            @click="clearAll">
            清空所有
        </div>
        <div class="search_none_place" 
            v-if="placeNone">
            很抱歉！无搜索结果
        </div>
    </div>
</template>

<script>
import headTop from '../../components/header/head.vue'
import {
    ajax_currentcity, 
    ajax_searchplace,
} from '../../server/city_api'
import {
    getStore,
    setStore,
    removeStore,
} from '../../config/mUtils.js'
export default {
    data() {
        return {
            cityname: '', // 当前城市名字
            inputValue: '', // 搜索地址
            historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
            placelist: [], // 搜索城市列表
            placeHistory: [], // 历史搜索记录
            placeNone: false, // 搜索无结果，显示提示信息
        }
    },
    components: {
        headTop
    },
    created() {
        this.getcurrentcity();
        this.initData();
    },
    methods: {
        getcurrentcity() {
            ajax_currentcity(this.$route.params.cityid).then(result => {
                this.cityname = result.data.name;
            })
        },
        // 获取搜索历史记录
        initData() {
            if (getStore('placeHistory')) {
                this.placelist = JSON.parse(getStore('placeHistory'));
            }else {
                this.placelist = [];
            }
        },
        goHome() {
            this.$router.push({
                path: '/home',
                query: {
                    
                }
            })
        },
        // 发送搜索信息
        postpois() {
            if(this.inputValue) {
                let sub_data = {
                    type: 'search',
                    city_id: this.$route.params.cityid,
                    keyword: this.inputValue
                }
                ajax_searchplace(sub_data).then(result => {
                    console.log(result)
                    this.historytitle = false;
                    this.placelist = result.data;
                    this.placeNone = result.data.length? false : true;
                })
            }
        },
        /**
         * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
         * 如果没有则新增，如果有则不做重复存储，判断完成后进入下一页
         */
        nextpage(index, geohash) {
            let history = getStore('placeHistory');
            let choosePlace = this.placelist[index];
            if(history) {
                let checkrepeat = false;
                this.placeHistory = JSON.parse(history);
                this.placeHistory.forEach(item => {
                    if(item.geohash == geohash) {
                        checkrepeat = true;
                    }
                })
                if(!checkrepeat) {
                    this.placeHistory.push(choosePlace)
                }
            }else {
                this.placeHistory.push(choosePlace)
            }
            setStore('placeHistory', this.placeHistory);
            this.$router.push({
                path: '/msite',
                query: {geohash}
            })
        },
        clearAll() {
            removeStore('placeHistory');
            this.initData();
        },
    }
}
</script>

<style lang="scss" scoped>
#city {
    .city_form {
        margin-top: 3.35rem;
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        div {
            width: 90%;
            margin: 0 auto;
            text-align: center;
        }
        .city_input {
            border-radius: 0.1rem;
            margin-top: 1rem;
            margin-bottom: 0.8rem;
            width: 100%;
            border: 1px solid #e4e4e4;
            padding: 0 0.3rem;
            font-size: 16px;
            color: #333;
            height: 2.4rem;
        }
        .city_submit {
            background-color: #3190e8;
            font-size: 16px;
            color: #fff;
            border-radius: 0.1rem;
            margin-bottom: 0.8rem;
            width: 100%;
            height: 2.4rem;
        }
    }
    .getpois_ul {
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        li {
            margin: 0 auto;
            padding-top: 0.65rem;
            border-bottom: 1px solid #e4e4e4;
            .pois_name {
                margin: 0 auto 0.35rem;
                width: 90%;
                font-size: 16px;
                color: #333;
            }
            .pois_address {
                width: 90%;
                margin: 0 auto 0.55rem;
                font-size: 12px;
                color: #999;
            }
        }
    }
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .search_none_place {
        margin: 0 auto;
        color: #333;
        background-color: #fff;
        text-indent: 0.5rem;
        font: 1rem/2.5rem "Microsoft YaHei";
    }
    .clear_all_history {
        text-align: center;
        line-height: 2rem;
        background-color: #fff;
    }
}
</style>