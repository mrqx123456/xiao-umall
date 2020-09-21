<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu'}">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>

      <el-form-item v-for="(item, index) in ruleForm.attrs" :label="'规格属性' + index" :key="index">
        <el-input v-model="item.value"></el-input>
        <el-button @click="addDomain" v-if="index == 0">新增规格</el-button>
        <el-button @click.prevent="removeDomain(item)" v-if="index != 0">删除</el-button>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: "", //面包屑最后的文字
      buttonTitle: "", //最后的按钮
      menulist: [],
      ruleForm: {
        specsname: "",
        attrs: [
          {
            value: "",
          },
        ],
        status: true
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择菜单类型", trigger: "change" }],
      },
    };
  },
  
  mounted() {

    // 这个组件即做添加也做编辑
    // 1.面包屑导航文字
    // 2.最下面的按钮
    // 3.编辑回显
    this.id = this.$route.query.id;
    // console.log(this.id)
    if (this.id) {
      this.title = "规格编辑";
      this.buttonTitle = "修改";
      this.$http.get("/specsinfo", { id: this.id }).then((res) => {
        // console.log(res.data);
        let { status } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
        };
        console.log(this.ruleForm);
      });
    } else {
      // 说明是添加
      this.title = "规格添加";
      this.buttonTitle = "添加";
    }

    // 显示规格列表
    this.$http.get("/specslist", { istree: false }).then((res) => {
      // console.log(res);
      this.menulist = res.data.list;
    });
  },
  methods: {
    //   新增规格
    addDomain() {
      this.ruleForm.attrs.push({
        value: ""
      });
    },
    //   删除规格
    removeDomain(item) {
      var index = this.ruleForm.attrs.indexOf(item);
      if (index !== -1) {
        this.ruleForm.attrs.splice(index, 1);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过
          this.ruleForm.status = this.ruleForm.status == true ? 1 : 2;
          if (this.id) {
            this.$http
              .post("/specsedit", { ...this.ruleForm, id: this.id })
              .then((res) => {
                if (res.data.code == 200) {
                  this.$router.back();
                }
              });
          } else {
            // [{value:'黑色'}，{value：'白色'}] => '黑色，白色'
            this.ruleForm.attrs = this.ruleForm.attrs.map(item=>{
              return item.value
            }).join(',')
            this.$http.post("/specsadd", this.ruleForm).then((res) => {
              console.log(res.data);
              if (res.data.code == 200) {
                this.$router.back();
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="stylus" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>