<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <span class="header_title">后台管理系统</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle_button" @click="toggleCollapse">|||</div>
        <!-- 菜单容器 -->
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activeMenuPath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff">
          <!-- 一级菜单项 -->
          <el-submenu :index="subMenu.id + ''" v-for="subMenu in menusList" :key="subMenu.id">
            <!-- 菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[subMenu.id]"></i>
              <!-- 文本 -->
              <span>{{subMenu.authName}}</span>
            </template>
            <!-- 二级菜单项 -->
            <el-menu-item  :index="`/home/${menuItem.path}`"
              v-for="menuItem in subMenu.children"
              :key="menuItem.id"
              @click="saveMenuPath(`/home/${menuItem.path}`)"
              >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{menuItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script type="text/ecmascript-6">

export default {
  data () {
    return {
      // 菜单列表的数据
      menusList: [],
      // 菜单栏是否折叠
      isCollapse: false,
      // 一级菜单的图标数据
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 菜单栏对应的路由地址
      activeMenuPath: ''
    }
  },
  mounted () {
    // 当组件时候就去发送请求获取菜单所需要的数据
    this.getMenusList()
    this.activeMenuPath = window.sessionStorage.getItem('activeMenuPath')
  },
  methods: {
    // 退出的方法
    logout () {
      // 清空sessionStorage即可
      // window.sessionStorage.removeItem('token')
      this.$router.replace('/login')
    },
    // 获取所有的菜单数据
    async getMenusList () {
      // await会将promise的数据取出来,这里取出的是axios返回的response对象,通过结构赋值将打他属性的值赋值给res
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        // 获取数据失败
        return this.$message.error(res.meta.msg)
      }
      this.menusList = res.data
    },
    // 点击按钮切换按钮的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 点击菜单项时将该菜单对应的路由地址给存起来
    saveMenuPath (MenuPath) {
      window.sessionStorage.setItem('activeMenuPath', MenuPath)
      this.activeMenuPath = MenuPath
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373d41;
    .header_title {
      font-size: 20px;
      color: #fff;
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle_button {
      background-color: #4a5064;
      line-height: 24px;
      font-size: 10px;
      letter-spacing: 0.2em;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
    .iconfont {
      margin-right: 10px;
    }
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
