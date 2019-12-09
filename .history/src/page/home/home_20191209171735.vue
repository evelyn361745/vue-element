<template>
    <div id="home">
        <head-top></head-top>
        <nav>
            <div>
                <span>当前选择城市</span>
                <span>当前定位不准，请在城市列表选择</span>
            </div>
            <router-link>
                <span>{{guessCity}}</span>
            </router-link>
        </nav>
        <section id="hot_city_container">
            <h4>热门城市</h4>
            <ul class="citylistul">
                <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
            </ul>
        </section>
        <section id="group_city_container"></section>
    </div>
</template>

<script>
import headTop from '../../components/header/head.vue'
export default {
    data() {
        return {
            guessCity: '', // 当前城市
        }
    },
    components:{
        headTop
    }
}
</script>
