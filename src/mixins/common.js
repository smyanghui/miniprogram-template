import wepy from 'wepy'

const SystemInfo = {};
wx.getSystemInfo({
  success(res) {
    Object.assign(SystemInfo, res);
  },
});

export default class testMixin extends wepy.mixin {
  data = {
    ready: false,
    SystemInfo,
  }
  methods = {
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }

  onReady() {
    this.ready = true;
    this.$apply();
  }

}
