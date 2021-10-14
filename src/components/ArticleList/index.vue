<template>
  <div>
    文章列表组件：{{ channelId }}
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>

</style>
