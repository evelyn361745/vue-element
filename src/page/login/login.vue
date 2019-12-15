<template>
    <div id="login">
        <head-top
            headTitle="密码登录">
            <div slot="left" >
                <van-icon name="arrow-left" @click="goHome"></van-icon>
                <span @click="goHome">返回</span>
            </div>
        </head-top>
        <van-cell-group>
            <van-field
                v-model="userAccount"
                clearable
                class="input_container"
                placeholder="账号"
            ></van-field>
            <van-field
                :type="mytype"
                clearable
                placeholder="密码"
                class="input_container"
            >
                <van-switch slot="button" v-model="passwd_checked"></van-switch>
            </van-field>
            <van-field
                v-model="codeNumber"
                clearable
                placeholder="验证码"
                class="input_container"
                maxlength="4"
            >
                <van-image slot="button" src="" width="100px" height="45px"></van-image>
            </van-field>
        </van-cell-group>
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
            codeNumber: '',
            passwd_checked: true,
            passWord: '',
        }
    },
    components: {
        headTop
    },
    computed:{
        mytype: function() {
            return this.passwd_checked?'password':''
        }
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
    .van-cell-group {
        padding-top: 3.35rem;
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