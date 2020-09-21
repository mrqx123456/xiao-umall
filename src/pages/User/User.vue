<template>
    <div id="menutab">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="goAdd">添加</el-button>
        
        <!-- 搜索框 -->
        <el-input size="mini" placeholder="输入关键字搜索"/>
        <!-- 表格数据 -->
        <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="id"
                             label="用户编号"
                             width="180">
            </el-table-column>
            <el-table-column prop="username"
                             label="用户名"
                             
                             width="180">
            </el-table-column>
            <el-table-column 
                             label="所属角色">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.roleid | roleFormat(rolelist)}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="status"
                             label="状态">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.status | statusFormat}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除吗"
                                   @onConfirm="del(scope.row.id)">
                        <el-button slot="reference"
                                   size="mini"
                                   type="danger">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [],
            num:1,
            rolelist:[]
        }
    },
    mounted() {
        this.getList()
        // 调用获取角色列表的接口
        this.$http.get('rolelist').then(res=>{
            this.rolelist = res.data.list
        })
    },
    methods: {
        getList () {
            this.$http.get("/userlist", {size:10,page:1 }).then(res => {
                console.log(res)
                this.tableData = res.data.list
            })
        },
        handleEdit (index, row) {
            console.log(index, row);
            this.$router.push('/user/edit?id='+row.id)
        },
        handleDelete (index, row) {
            console.log(index, row);
        },
        goAdd () { 
            this.$router.push("/home/user/add")
        },
        // 调删除接口
        del(id){
            this.$http.post('/userdelete',{id}).then(res=>{
                if(res.data.code == 200){
                    this.getList()
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }
                
            })
        }
    },
}
</script>

<style  scoped>





.el-button+.el-button {
    margin-left: 0px;
}
</style>