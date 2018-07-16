import wepy from 'wepy';

class Login {

  constructor() {}

  // 微信登录
  openLogin(type, callback) {
    wx.login({
      success: (res) => {
        this.appLogin({ code: res.code }, callback);
      },
      error() {
        wx.showToast({ title: '登录失败' });
      }
    })
  }

  // 服务器登录
  appLogin(data, callback) {
    wepy.request({
      method: 'POST',
      url: '/user/login',
      data,
      success(res) {
        const result = res.result;
        if (res.code > 0) {
          wx.showModal({
            showCancel: false,
            content: '信息获取异常',
          });
          return;
        }
        wx.setStorageSync('nickname', res.nickname || '');
        wx.setStorageSync('headimgurl', res.headimgurl || '');
        wx.setStorageSync('token', res.token || '');
        callback && callback();
      },
      fail(err) {
        wx.showToast({ title: '登录失败' });
      }
    });
  }

  // 获取微信用户信息
  getUserInfo(callback) {
    wx.getUserInfo({
      success(res) {
        wx.setStorageSync('nickname', res.nickname || '');
        wx.setStorageSync('headimgurl', res.headimgurl || '');
      }
    })
  }

}

export default Login;
