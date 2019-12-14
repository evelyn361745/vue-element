<template>
    <div id="head_top">
        <van-nav-bar
            :title="headTitle"
            fixed
            :left-text="leftTitle"
            :right-text="rightTitle"
            @click-left="onClickLeft"
            @click-right="onClickRight">
            <van-icon name="search" slot="right" v-if="search"></van-icon>
            <slot slot="left" name="left"></slot>
            <slot slot="title" name="title"></slot>
            <slot slot="right" name="right"></slot>
        </van-nav-bar>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ['leftarrow', 'headTitle', 'rightTitle', 'leftTitle', 'search'],
    methods: {
        onClickLeft() {

        },
        onClickRight() {

        }
    }
}
</script>

<style lang="scss" scoped>
#head_top {
    background-color: #3190e8;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.95rem;
    color: #fff;
    .van-nav-bar {
        background-color: #3190e8;
        height: 46px;
        line-height: 46px;
        text-align: center;
        color: #fff;
        .van-nav-bar__text {
            color: #fff;
        }
        .van-icon {
            color: #fff;
        }
        .van-nav-bar__title {
            color: #fff;
        }
    }
    
}
</style>