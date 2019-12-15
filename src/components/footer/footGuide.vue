<template>
    <div id="footguide">
        <van-tabbar v-model="active">
            <van-tabbar-item 
                name="msite" 
                icon="shop-o"
                :to="'/msite?geohash='+ geohash">
                外卖
            </van-tabbar-item>
            <van-tabbar-item 
                name="search" 
                icon="search"
                :to="'/search/' + geohash">
                搜索
            </van-tabbar-item>
            <van-tabbar-item 
                name="order" 
                icon="records"
                to="/order">
                订单
            </van-tabbar-item>
            <van-tabbar-item 
                name="profile" 
                icon="contact"
                to="/profile">
                我的
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 'msite',
            geohash: '',
        }
    }
}
</script>

<style lang="scss" scoped>

</style>