import wepy from 'wepy';

function requestBase(params = {}) {

  const { url, method = 'get', data, success, fail, complete, options = {} } = params;

  const _url = `api/aa/${url}`;

  wx.request({
    url: _url,
    method,
    data,
    header,
    success(res) {
      console.log(res);
    },
    fail(res) {
      console.log(res);
    },
    complete() {
      typeof complete === 'function' && complete();
    },
  });

}

function request(url, method, data, success, fail, options) {
  requestBase({
    url,
    method,
    data,
    success,
    fail,
    options,
  });
}

export default request;
