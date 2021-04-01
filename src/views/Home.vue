<template>
  <div class="home">
    <h1>Home</h1>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      msg: ''
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
