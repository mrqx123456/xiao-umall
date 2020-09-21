<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu'}">商品管理</el-breadcrumb-item>
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
      <!-- 上级分类 -->
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="分类">
          <el-option label="顶级分类" :value="0"></el-option>
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="(item) in catelist"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 分类名称 -->
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="change"
          :file-list="imgarr"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 状态 -->
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
      catelist: [],
      imgarr: [],
      ruleForm: {
        pid: "",
        catename: "",
        status: true,
        img: "",
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择菜单类型", trigger: "change" }],
      },
    };
  },
  mounted() {
    // 这个组件即做添加也做编辑
    // 1.面包屑导航文字2.最下面的按钮3.编辑有回显
    // 获取路由参数id
    this.id = this.$route.query.id;
    // 有id则为编辑页面，没有则为添加页面
    if (this.id) {
      this.title = "商品分类编辑";
      this.buttonTitle = "修改";
      this.$http.get("/cateinfo", { id: this.id }).then((res) => {
        console.log(res)
        let { status } = res.data.list;
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
        };
        this.imgarr.push({
          url: "http://localhost:3000" + res.data.list.img,
        });

      });
    } else {
      this.title = "菜单添加";
      this.buttonTitle = "添加";
    }
    this.$http.get("/catelist", { istree: false }).then((res) => {
      this.catelist = res.data.list;
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过
          this.ruleForm.status = this.ruleForm.status == true ? 1 : 2;
          // 生成一个formData对象
          let form = new FormData();
          //往这个formData对象内,添加键值对
          for (var key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          // 判断是否有id，有id则为编辑路由，（编辑和添加公用一个组件）
          if (this.id) {
            form.append(id, this.id);
            this.$http.post("/cateedit", form).then((res) => {
              if (res.data.code == 200) {
                this.$router.back();
              }
            });
          } else {
            this.$http.post("/cateadd", form).then((res) => {
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
    change(file, filelist) {
      this.ruleForm.img = file.raw;
    },
  },
};
</script>

<style lang="stylus" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>