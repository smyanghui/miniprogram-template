import wepy from 'wepy';

function request(params = {}) {
  const { url, method = 'get', data, success, fail, complete } = params;
  wepy.request({
    url: `https://devapi.nfangbian.com${url}`,
    method,
    data,
    success(res) {
      if (res.code > 0) {
        wx.showModal({
          showCancel: false,
          content: res.message,
        });
        return;
      }
      success && success(res.data);
    },
    fail(res) {
      wx.showModal({
        showCancel: false,
        content: '网络异常，请稍后再试',
      });
      fail && fail();
    },
    complete() {
      complete && complete();
    },
  });

}

export default request;
