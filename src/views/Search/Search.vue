<template>
  <div>
    <!-- Header 头部区域 -->
    <div class="search-header">
      <!-- 后退图标 -->
      <van-icon name="arrow-left" color="white" size="18" class="goback" @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search v-model.trim="kw" placeholder="请输入搜索关键词" background="#007BFF" shape="round" @input="onInput" />
    </div>

    <!-- 搜索建议 -->
    <div class="sugg-list" v-if="kw.length != 0">
      <div class="sugg-item" v-for="(item, i) in suggestList" :key="i" v-html="item" @click="gotoSearchResult"></div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="history = []" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item" v-for="(tag, i) in history" :key="i" @click="gotoSearchResult" >{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggestListAPI } from '@/api/searchAPI.js'

export default {
  name: 'Search',
  data() {
    return {
      // 搜索关键词
      kw: '',
      // 延迟器Id
      timeId: null,
      // 搜索建议列表
      suggestList: [],
      // 搜索历史
      history: JSON.parse(localStorage.getItem('history') || '[]')
    }
  },
  methods: {
    // 搜索框防抖
    onInput() {
      clearTimeout(this.timeId)

      // 如果搜索内容为空，清空列表
      if (this.kw === '') {
        this.suggestList = []
        return
      }

      console.log(this.kw)
      this.timeId = setTimeout(() => {
        this.initSuggestList()
      }, 500)
    },

    // 请求搜索建议列表数据的方法
    async initSuggestList() {
      const { data: res } = await getSuggestListAPI(this.kw)
      if (res.message === 'OK') {
        console.log(res.data.options, '搜索匹配列表')

        // 过滤掉已经有的搜索历史
        const newHistory = this.history.filter(item => item !== this.kw)
        newHistory.unshift(this.kw)
        this.history = newHistory

        // 高亮显示搜索内容
        this.hlightKeywords(res.data.options)

        // 请求搜索的列表
        this.suggestList = res.data.options
      }
    },
    // 高亮搜索关键词的方法，形参中的 arr 是搜索建议的数组
    hlightKeywords(arr) {
      // 做校验
      if (arr.length !== 0 && arr[0] !== null) {
        // 1. 根据用户输入的 kw，动态创建正则表达式
        const reg = new RegExp(this.kw, 'ig')

        // 循环数组中的每一项
        arr.forEach((item, index) => {
          // 2. 调用字符串的 replace 方法进行关键字的高亮处理
          arr[index] = item.replace(reg, val => {
            return `<span style="color: red; font-weight: bold;">${val}</span>`
          })
        })
      }
    },
    // 跳转到搜索结果页
    gotoSearchResult(e) {
      this.$router.push('/search/' + e.target.innerText)
    }
  },
  watch: {
    // 监视历史记录的变化
    history(newVal) {
      // 持久化存储到本地
      localStorage.setItem('history', JSON.stringify(newVal))
    }
  },
  mounted() {
    // 搜索框自动聚焦
    const ipt = document.querySelector('input[type=search]')
    ipt && ipt.focus()
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  // 后退按钮
  .goback {
    padding-left: 14px;
  }
  // 搜索组件
  .van-search {
    flex: 1;
  }
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
