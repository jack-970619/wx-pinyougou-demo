// pages/login/login.js
Page({
    wxLogin(e) {
        console.log(e)
        wx.login({
            success (res) {
                console.log(res)
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://example.com/onLogin',
                  data: {
                    code: res.code
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
        })
    },

    goToPhoneLogin() {
        wx.navigateTo({
          url: '/pages/phone-login/phone-login',
        })
    }
})