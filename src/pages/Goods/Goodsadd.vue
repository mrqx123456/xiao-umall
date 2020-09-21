<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/goods'}">商品列表</el-breadcrumb-item>
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
      <!-- 一级分类 -->
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择一级分类"  @change="firstCateChange">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="(item) in firstCateList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 二级分类 -->
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择二级分类">
          <el-option
            :label="item.catename"
            :value="item.id"
            v-for="(item,index) in secondCateList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 商品名称名称 -->
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <!-- 价格 -->
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>

      <!-- 市场价格 -->
      <el-form-item label="市场价格" prop="market_price">
        <el-input v-model="ruleForm.market_price"></el-input>
      </el-form-item>

      <!-- 图片上传 -->
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change="change"
          :file-list="arr"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <!-- 商品规格 -->
      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="ruleForm.specsid" placeholder="请选择规格"  @change="specsChange">
          <el-option
            :label="item.specsname"
            :value="item.id"
            v-for="(item) in specsList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 规格属性 -->
      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" placeholder="请选择规格属性">
          <el-option :label="item" :value="item" v-for="(item) in specsAttr" :key="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!-- 是否新品 -->
      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 是否热卖 -->
      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model.number="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- 状态 -->
      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{buttonTitle}}</el-button>
      </el-form-item>

      <!-- 富文本编辑器 -->
    </el-form>
  </div>
</template>

<script>
import E from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
export default {
  data() {
    return {
      id: "",
      title: "", //面包屑最后的文字
      buttonTitle: "", //最后的按钮
      firstCateList: [], //一级商品列表
      secondCateList: [],//erji
      specsList: [], //商品规格
      specsAttr: [],  //商品属性
      arr: [],  //回显图片的数组
      img: "",  
      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        status: true,
      },
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateidd: [
          { required: true, message: "清选择二级分类", trigger: "change" },
        ],
        goodsname: [
          { required: true, message: "请填写商品名称", trigger: "blur" },
        ],
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
      this.$http.get("/goodsinfo", { id: this.id }).then((res) => {
        let { status,isnew,ishot} = res.data.list;
        console.log(res.data);
        this.ruleForm = {
          ...res.data.list,
          status: status == 1 ? true : false,
        };
        console.log(this.ruleForm);
        this.arr.push({
          url: "http://localhost:3000" + res.data.list.img,
        });

        this.firstCateChange(res.data.list.first_cateid)
      });
    } else {
      this.title = "商品添加";
      this.buttonTitle = "添加";
    }
    // 页面更新调用商品分类类表渲染一级分类
    this.$http.get("/catelist", { istree: false }).then((res) => {
      this.firstCateList = res.data.list;
    });
    // 页面更新调用商品规格列表渲染商品规格
    this.$http.get("/specslist").then((res) => {
      this.specsList = res.data.list;
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过
          this.ruleForm.status = this.ruleForm.status == true ? 1 : 2;
          // 是否新品     1-是 2-否
          this.ruleForm.isnew = this.ruleForm.isnew == true?1:2
          // 是否热卖推荐 1-是 2-否
          this.ruleForm.ishot = this.ruleForm.ishot == true?1:2
          // 生成一个formData对象
          let form = new FormData();
          //往这个formData对象内,添加键值对
          for (var key in this.ruleForm) {
            form.append(key, this.ruleForm[key]);
          }
          // 判断是否有图片，如果有则添加到form对象中
          if(this.img){
            form.append(key,this.ruleForm[key])
          }

          // 判断是否有id，有id则为编辑路由，（编辑和添加公用一个组件）
          if (this.id) {
            form.append('id', this.id);
            this.$http.post("/goodsedit", form).then((res) => {
              if (res.data.code == 200) {
                this.$router.back();
              }
            });
          } else {
            this.$http.post("/goodsadd", form).then((res) => {
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
    // 一级分类的改变
    firstCateChange(id) {
      this.$http.get("/catelist", { pid: id }).then((res) => {

        this.secondCateList = res.data.list;
      });
    },
    //商品规格的改变
    specsChange(id) {
      this.$http.get("/specsinfo", { id }).then((res) => {
        console.log(res);
        this.specsAttr = res.data.list[0].attrs;
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>