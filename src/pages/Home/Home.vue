<template>
  <div id="home">
    <el-container>
      <el-aside width="200px">
        <el-col :span="24">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <!-- 标题1 首页-->
            <el-menu-item index="index">
                <i class="el-icon-menu"></i>
                首页
            </el-menu-item>

            <!-- 标题2 系统设置 -->
            <el-submenu index="1" v-for="(item,index) in getUser" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item :index="'/home'+item.url" v-for="(item,index) in item.children" :key="index">
                  
                  {{item.title}}  

                </el-menu-item>
            </el-submenu>

            <!-- 标题3 商城管理-->
            
        </el-menu>
    </el-col>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        menulist:[]

      }
    },
    computed: {
      getUser() {

        return this.$store.state.user.menus
    },
}
  }
</script>

<style scoped>
#home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}


.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height:100%
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}

.el-menu-item, .el-submenu {
    width: 200px;
}
.el-button--primary {
    margin: 10px 0;
}
</style>