<template>
  <div class="shopadd">
    <span class="box">商品添加</span>
    <el-form :model="searchForm" size="mini" :inline="true">
      <el-form-item label="商品名称">
        <el-input v-model="searchForm.name" placeholder="商品名称"></el-input>
      </el-form-item>

      <el-form-item label="商品分类">
        <el-select v-model="searchForm.category">
          <el-option
            :value="items.cateName"
            v-for="(items, index) in arr"
            :key="index"
            >{{ items.cateName }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="searchForm.price" placeholder="商品价格"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imgBaseUrl + imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="searchForm.dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="searchForm.goodsDesc"
          width="300"
        >
        </el-input>
      </el-form-item>
    </el-form>

    <el-button @click="AddShopBtn" type="primary" size="small"
      >添加商品</el-button
    >
  </div>
</template>

<script>
import { ShopListSearch, AddShop } from "@/api/apis.js";
export default {
  data() {
    return {
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      imageUrl: "",
      arr: [],
      searchForm: {
        name: "",
        category: "",
        price: "",
        goodsDesc: "",
        imageUrl: ""
      },
      dialogVisible: false
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      console.log(res);
      this.imageUrl = res.imgUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    AddShopBtn() {
      this.$confirm("你确定添加该商品吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          AddShop(
            this.searchForm.name,
            this.searchForm.category,
            this.searchForm.price,
            this.imageUrl,
            this.searchForm.goodsDesc
          ).then(res => {
            console.log(res);
            this.$router.push("/shop/shoplist");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    ShopListSearch().then(res => {
      this.arr = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.shopadd {
  background-color: white;
  margin: 15px 15px 0 15px;
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  .el-form {
    margin: 15px 15px 0 20px;
    display: flex;
    flex-direction: column;
    /deep/ .el-textarea__inner {
      width: 300px;
    }
  }
  .el-button {
    margin-left: 20px;
  }
}
</style>