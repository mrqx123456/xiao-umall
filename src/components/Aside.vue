<template>
    <el-col :span="24">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- 标题1 首页-->
            <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>

            <!-- 标题2 系统设置 -->
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统设置</span>
                </template>
                <el-menu-item index="1-1" @click='goMenu'>菜单管理</el-menu-item>
                <el-menu-item index="1-2">角色管理</el-menu-item>
                <el-menu-item index="1-2">管理员管理</el-menu-item> 
            </el-submenu>

            <!-- 标题3 商城管理-->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商城管理</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-2">选项3</el-menu-item> 
          </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
    export default {
       components:{
           
       },
       methods:{
           goMenu(){
               this.$router.push('/menu')
           }
       }
    }
</script>

<style scoped>

</style>