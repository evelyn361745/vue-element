<template>
    <div id="msite">
        <foot-guide></foot-guide>
    </div>
</template>

<script>
import footGuide from '../../components/footer/footGuide.vue'
export default {
    data() {
        return {
            geohash: '', // city页面传递过来的地址geohash
        }
    },
    components: {
        footGuide
    }
}
</script>

<style lang="scss" scoped>

</style>