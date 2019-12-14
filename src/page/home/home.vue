<template>
    <div id="home">
        <head-top 
            leftTitle="ele.me" 
        >
            <div slot="right" @click="goLogin">登录|注册</div>
        </head-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市</span>
                <span>定位不准时，请在城市列表选择</span>
            </div>
            <router-link :to="'/city' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
            </router-link>
        </nav>
        <div class="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                {{item.name}}
                </router-link>
            </ul>
        </div>
        <div class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
                    <h4 class="city_title">
                        {{key}}
                        <span v-if="index == 0">(按字母排序)</span>
                    </h4>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/header/head.vue'
import {
    ajax_guesscity_list,
    ajax_hotcity_list,
    ajax_groupcity_list
} from '../../server/home_api.js'
export default {
    data() {
        return {
            guessCity: '', // 当前城市
            guessCityid: '',
            hotcity: [],
            groupcity: {},
        }
    },
    computed: {
        sortgroupcity() {
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if(this.groupcity[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
    },
    components:{
        headTop
    },
    mounted(){
        this.init();
    },
    methods: {
        init() {
            this.getcityGuess();
            this.getcityHost();
            this.getcityGroup();
        },
        getcityGuess() {
            ajax_guesscity_list().then(result => {
               // console.log(result)
                this.guessCity = result.data.name;
                this.guessCityid = result.data.id;
            })
        },
        getcityHost() {
            ajax_hotcity_list().then(result => {
               // console.log(result);
                this.hotcity = result.data;
            })
        },
        getcityGroup() {
            ajax_groupcity_list().then(result => {
               // console.log(result)
                this.groupcity = result.data;
            })
        },
        goLogin() {
            this.$router.push({
                path: '/login',
                query: {
                    
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#home {
    .city_nav {
        padding-top: 2.35rem;
        border-top: 1px solid #e4e4e4;
        background-color: #fff;
        margin-bottom: 0.4rem;
        .city_tip {
            display: flex;
            justify-content: space-between;
            line-height: 1.45rem;
            padding: 0 0.45rem;
            span:nth-of-type(1) {
                font-size: 0.55rem;
                color: #666;
            }
            span:nth-of-type(2) {
                font-weight: 900;
                font-size: 0.475rem;
                color: #9f9f9f;
            }
        }
        .guess_city {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.8rem;
            padding: 0 0.45rem;
            border-top: 1px solid #e4e4e4;
            border-bottom: 2px solid #e4e4e4;
            font: 0.75/1.8rem "Microsoft Yahei";
            span {
                color: #3190e8;
                text-decoration: none;
            }
        }
    }
    .city_title {
        color: #666;
        font-weight: 400;
        text-indent: 0.45rem;
        border-top: 2px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        font: 0.55rem/1.45rem "Helvetica Neue"
    }
    .citylistul {
        li{
            float: left;
            text-align: center;
            color: #3190e8;
            background-color: #fff;
            border-bottom: 0.025rem solid #e4e4e4;
            border-right: 0.025rem solid #e4e4e4;
            width: 25%;
            height: 1.75rem;
            font: 0.6rem/1.75rem "Microsoft YaHei"
        }
        li:nth-of-type(4n) {
            border-right: none;
        }
    }
    .hot_city_container {
        background-color: #fff;
        margin-bottom: 0.4rem;
    }
    .group_city_container {
        .letter_classify {
            .letter_classify_li {
                margin-bottom: 0.4rem;
                background-color: #fff;
                border-bottom: 1px solid #e4e4e4;
                .groupcity_name_container {
                    li{
                        color: #666;
                    }
                }
            }
        }
    }
    .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }
}
</style>