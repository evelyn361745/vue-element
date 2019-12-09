<template>
    <div id="home">
        <head-top></head-top>
        <nav>
            <div>
                <span>当前选择城市</span>
                <span>当前定位不准，请在城市列表选择</span>
            </div>
            
        </nav>
    </div>
</template>

<script>
import headTop from '../../components/header/head.vue'
export default {
    data() {
        return {

        }
    },
    components:{
        headTop
    }
}
</script>
