<template>
  <div class="example">
    <h1>Example</h1>
    <div class="content">
      <div class="item">
        <span class="label">fonteditor</span>
        <span class="text"><i class="icon icon-menu"></i></span>
      </div>
      <div class="item">
        <span class="label">v-lazy</span>
        <span class="text"><img v-lazy="{src: 'https://www.baidu.com/img/flexible/logo/pc/result.png', error: img, loading: img}"></span>
      </div>
      <div class="item">
        <span class="label">public</span>
        <span class="text"><img src="@/../public/static/images/file.png"></span>
      </div>
      <div class="item">
        <span class="label">fetch</span>
        <span class="text">{{msg}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Example',
  data() {
    return {
      msg: '',
      img: require('@/assets/images/img-error.png')
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$fetch('/mock/api/test_api', {}).then(res => {
        this.msg = res.data
      }).catch(err => {
        this.msg = '获取失败'
      });
    }
  }
}
</script>
<style scoped lang="less">
.content {
  width: 50%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  .item {
    padding: .1rem;
  }
  .label {
    width: 30%;
    display: inline-block;
    text-align: right;
    font-weight: bold;
  }
  .text {
    width: 70%;
    display: inline-block;
  }
}
</style>