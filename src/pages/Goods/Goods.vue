<template>
    <div id="menutab">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
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
                             label="商品编号"
                             width="180">
            </el-table-column>
            <!-- 商品名称 -->
            <el-table-column prop="goodsname"
                             label="商品名称"
                             
                             width="180">
            </el-table-column>
            <!-- 商品价格 -->
            <el-table-column prop="price"
                             label="商品价格"
                             
                             width="180">
            </el-table-column>

            <!-- 市场价格 -->
            <el-table-column prop="market_price"
                             label="市场价格"
                             
                             width="180">
            </el-table-column>

            <!-- 图片 -->
            <el-table-column 
                             label="图片" width='100'>
                             <!-- row是插槽名  对应 组件内的    :row='row'-->
                <template slot-scope="scope">
                    <img :src="'http://localhost:3000' + scope.row.img" alt="">
                </template>
            </el-table-column>

            <!-- 是否新品 -->
            <el-table-column prop="isnew"
                             label="是否新品">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.isnew | isnewFormat}}</el-tag>
                </template>
            </el-table-column>

            <!-- 是否热卖 -->
            <el-table-column prop="ishot"
                             label="是否热卖">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.ishot | ishotFormat}}</el-tag>
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
            search:'',
            tableData: []
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList () {
            this.$http.get("/goodslist", { istree: true }).then(res => {
               
                this.tableData = res.data.list
            })
        },
        // 跳转到商品编辑页
        handleEdit (index, row) {
            console.log(index, row);
            this.$router.push('/home/goods/edit?id='+row.id)
        },
        handleDelete (index, row) {

        },
        // 调转到商品添加页
        goAdd () { 
            this.$router.push("/home/goods/add")
        },
        // 调删除接口
        del(id){
            this.$http.post('/goodsdelete',{id}).then(res=>{
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

img{
    
    width: 100%;
    height: 100%;
}



.el-button+.el-button {
    margin-left: 0px;
}
</style>