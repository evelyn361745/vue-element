<template>
    <div id="head_top">
        <mt-header fixed>
            <slot name="logo"></slot>
            <slot name="search"></slot>
            <div class="head_goback" v-if="goback" @click="$router.go(-1)">
                
            </div>
            <mt-button slot="right" class="head_login">登录|注册</mt-button>
        </mt-header>
    </div>
</template>
<style lang="scss" scoped>
#head_top {
    background-color: #3190e8;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 1.95rem;
    .head_logo {
        left: 0.4rem;
        font-weight: 400;
        font-size: 0.7rem;
        color: #fff;
        width: 2.3rem;
        height: 0.7rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .head_login {
        right: 0.55rem;
        font-size: 0.65rem;
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>