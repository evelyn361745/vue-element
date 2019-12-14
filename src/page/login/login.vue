<template>
    <div id="login">
        <head-top
            headTitle="密码登录">
            <slot slot="left" >
                <van-icon name="arrow-left" @click="goHome"></van-icon>
                <span @click="goHome">返回</span>
            </slot>
        </head-top>
        <form class="loginForm">
            <div class="input_container">
                <input type="text" placeholder="账号" v-model="userAccount">
            </div>
            <div class="input_container">
                <input type="password" placeholder="密码" v-model="passWord">
            </div>
            <div class="input_container">
                <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
            </div>
        </form>
        <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container">登录</div>
        <router-link to="/forget" class="to_forget">重置密码？</router-link>
    </div>
</template>

<script>
import headTop from '../../components/header/head.vue'
export default {
    data() {
        return {
            userAccount: '',
            passWord: '',
            codeNumber: '',
        }
    },
    components: {
        headTop
    },
    methods: {
        goHome() {
            this.$router.push({
                path: '/home',
                query: {
                    
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#login {
    .loginForm {
        padding-top: 2.35rem;
        background-color: #fff;
    }
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
    }
    .login_tips {
        font-size: 0.5rem;
        color: red;
        padding: .4rem .6rem;
        line-height: .5rem;
    }
    .login_container {
        margin: 0 .5rem 1rem;
        font-size: 0.7rem;
        color: #fff;
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .to_forget {
        float: right;
        font-size: 0.6rem;
        color: #3b95e9;
        margin-right: .3rem;
    }
}
</style>