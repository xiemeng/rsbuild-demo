<template>
  <div id="main"></div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { getUrlValue } from '@/utils/util'
export default {
  data() {
    return {}
  },
  computed: {
    redirect() {
      return this.$route.query.redirect
    },
    loginId() {
      return getUrlValue(this.redirect, 'loginId')
    },
    terminal() {
      return this.$route.query.terminal
    }
  },
  created() {
    if (location.href.search('terminal') != -1) {
      window.open('https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww7fa66e2548495cb5&redirect_uri=scrm.kolify.cn&response_type=code&scope=snsapi_base&#wechat_redirect', '_self')
      return
    }
    if (this.loginId || process.env.NODE_ENV === 'development') {
      this.login()
    } else {
      this.enterpriseWeChat()
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    login() {
      const params = {
        loginId: this.loginId
      }
      this.Login(params)
        .then(res => this.loginSuccess(res))
        .catch(() => {
          this.enterpriseWeChat()
        })
    },
    enterpriseWeChat() {
      var isComWx = /wxwork/i.test(navigator.userAgent); // 是否企业微信
      if (isComWx) {
        this.wxlogin()
      } else {
        this.weChat()
      }
    },
    loginSuccess(res) {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
    },
    // 企业微信登录
    wxlogin() {

    },
    // 扫码登录
    weChat() {

    }
  }
}
</script>

<style lang="less" scoped>
#main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-top: 100px;
  text-align: center;
}
</style>
