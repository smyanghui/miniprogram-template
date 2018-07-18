
import wepy from 'wepy';
import request from './request';

const APPID = 'wx38c2b93884cce8c6';

const login = {};

// 服务器登录
function appLogin(code) {
  request({
    url: '/xcx/login',
    data: { code, appid: APPID },
    success: (res) => {
      if (res.code == 0) {
        wx.setStorageSync('TOKEN', res.data.token);
      } else {
        wx.showToast({ icon: 'none', title: '登录失败' });
      }
    }
  })
}

// 微信登录
login.wxLogin = function() {
  wx.login({
    success: (res) => {
      if (res.code) {
        appLogin(res.code);
      } else {
        wx.showToast({ icon: 'none', title: '登录失败' });
      }
    }
  })
}

// 获取用户信息
function rUser(callback) {
  // wx.getUserInfo({
  //   success(res) {
  //     wx.setStorageSync('nickname', res.nickname || '');
  //     wx.setStorageSync('headimgurl', res.headimgurl || '');
  //   }
  // })
}

login.cToken = function() {
  let curToken = wx.getStorageSync('TOKEN');
  if (!curToken) return login.wxLogin();
  request({
    url: '/check/token',
    data: { token: curToken },
    success: (res) => {
      if (res.code == 0) {
        if (!res.data.islogin) login.wxLogin();
      }
    }
  })
}

export default login;
