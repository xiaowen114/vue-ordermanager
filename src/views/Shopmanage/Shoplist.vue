<template>
  <div class="shoplist">
    <span class="box">商品列表</span>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片地址">
              <img :src="props.row.imgUrl" alt="" />
            </el-form-item>
            <el-form-item label="商品创建时间">
              <span>{{ props.row.ctime | filterTime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"> </el-table-column>
      <el-table-column label="所属分类" prop="category"> </el-table-column>
      <el-table-column label="商品价格" prop="price" width="120">
      </el-table-column>
      <el-table-column label="商品图片" prop="imgUrl"> 
         <template slot-scope="scope">
            <img width="50" height="50" :src="imgBaseUrl + scope.row.imgUrl" alt />
          </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"> </el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="Delbtn(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import moment from "moment"
import { GetShopList, DelShop } from "@/api/apis.js";
export default {
  data() {
    return {
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      tableData: [],
      total: 20,
      pageSize: 4,
      currentPage: 1
    };

  },
  filters:{
    filterTime(data){
      return moment(data).format("YYYY-MM-DD H  H:mm:ss")
    }
  },
  created() {
    GetShopList({
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }).then(res => {
   
    console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
    });
  },
  methods: {
    handleSizeChange(a) {
      this.pageSize = a;
      GetShopList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(a) {
      this.currentPage = a;
      GetShopList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    Delbtn(row) {
      DelShop({ id: row.id }).then(res => {
        if (res.data.code == 0) {
          GetShopList({
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }).then(res => {
            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.shoplist {
  background-color: white;
  margin: 15px 15px 0 15px;
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  /deep/.cell {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>