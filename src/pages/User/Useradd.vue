<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user'}">管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单 -->
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">

            

            <el-form-item label="所属角色"
                          prop="roleid">
                <el-select v-model="ruleForm.roleid"
                           placeholder="请选择角色">
                    <el-option :label="item.rolename"
                                :value="item.id"
                               v-for="(item,index) in userlist" :key='index'></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户名"
                          prop="username">
                <el-input v-model="ruleForm.username"  ></el-input>
            </el-form-item>

            <el-form-item label="密码"
                          prop="password" >
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item label="状态"
                          prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            
            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            id:'',
            title:'',//面包屑最后的文字
            buttonTitle:'',//最后的按钮
            userlist:[],   //渲染角色属性
            ruleForm: {
                roleid:'',
                username:'',
                password:'',
                status:true,
                
            },
            rules: {
                roleid: [
                    { required: true, message: '请选择角色名称', trigger: 'change' }
                ],
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //验证通过
                    this.ruleForm.status = this.ruleForm.status == true ? 1:2
                    if(this.id){
                        this.$http.post('/useredit',{...this.ruleForm,id:this.id}).then(res=>{
                            if(res.data.code == 200){
                                this.$router.back()
                            }
                        })
                    }else{ 
                        this.$http.post('/useradd',this.ruleForm).then(res=>{
                        // console.log(res.data);
                        if(res.data.code == 200){
                            this.$router.back()
                        }
                    }) 
                }

            } else {
                console.log('error submit!!');
                return false;
                }
            });
        },

    },
    mounted() {
        this.id = this.$route.query.id
        // 有id则为编辑页面，没有则为添加页面 回显
        if(this.id){
            this.title = '菜单编辑'
            this.buttonTitle = '修改'
            this.$http.get('/userinfo',{id:this.id}).then(res=>{
                let { status } = res.data.list
                this.ruleForm = {...res.data.list, status: status == 1?true:false}
            })
        }else{
            this.title = '菜单添加'
            this.buttonTitle = '添加'
        }
        // 调用role模块的接口显示user用户管理模块的所属角色
        this.$http.get('/rolelist',{istree:false}).then(res=>{
            console.log(res);
            this.userlist = res.data.list
        })
    },
}
</script>

<style scoped>
.demo-ruleForm{
    margin-top : 50px;
}


</style>