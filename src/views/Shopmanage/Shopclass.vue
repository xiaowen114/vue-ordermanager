<template>
  <div class="shopclass">
    <p class="box">
      <span>商品分类</span
      ><el-button type="primary" size="small" @click="AddClass"
        >添加分类</el-button
      >
    </p>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="序号" width="180"> </el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.boolean">{{ scope.row.cateName }}</span>
          <el-input
            v-model="scope.row.cateName"
            v-if="!scope.row.boolean"
            size="small"
            :placeholder="scope.row.cateName"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.boolean"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            v-if="scope.row.boolean"
            @click="editbtn1(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="success"
            v-if="!scope.row.boolean"
            @click="editbtn2(scope.row)"
            >完成</el-button
          >
          <el-button size="small" type="danger" @click="DelBtn(scope.row)"
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

    <!-- 模态框 -->
    <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" :inline="true">
        <!-- 订单号 -->
        <el-form-item label="分类名称">
          <el-input v-model="form.cateName" placeholder="分类名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="form.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ShopListGet,
  ShopListSet,
  ShopListDel,
  ShopListAdd
} from "@/api/apis.js";
export default {
  data() {
    return {
      form: {
        cateName: "",
        state: true
      },

      dialogVisible: false,
      value1: "",
      pageSize: 4,
      currentPage: 1,
      total: 20,

      tableData: []
    };
  },
  created() {
    ShopListGet(this.currentPage, this.pageSize).then(res => {
      res.data.data.forEach((v, i) => {
        v.name = i + 1;
        v.boolean = true;
        v.state = v.state == 1 ? true : false;
      });

      this.tableData = res.data.data;
      this.total = res.data.total;
    });
  },
  methods: {
    determine() {
      this.dialogVisible = false;
      ShopListAdd(this.form.cateName, this.form.state).then(res => {
        if (res.data.code == 0) {
          ShopListGet(this.currentPage, this.pageSize).then(res => {
            res.data.data.forEach((v, i) => {
              v.name = i + 1;
              v.boolean = true;
              v.state = v.state == 1 ? true : false;
            });

            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },
    handleSizeChange(a) {
      this.pageSize = a;
      ShopListGet(this.currentPage, this.pageSize).then(res => {
        res.data.data.forEach((v, i) => {
          v.name = i + 1;
          v.boolean = true;
          v.state = v.state == 1 ? true : false;
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(a) {
      this.currentPage = a;
      ShopListGet(this.currentPage, this.pageSize).then(res => {
        res.data.data.forEach((v, i) => {
          v.name = i + 1;
          v.boolean = true;
          v.state = v.state == 1 ? true : false;
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //编辑
    editbtn1(row) {
      row.boolean = false;
    },
    //完成
    editbtn2(row) {
      row.boolean = true;
      ShopListSet(row.id, row.cateName, row.state).then(res => {
        if (res.data.code == 0) {
          ShopListGet(this.currentPage, this.pageSize).then(res => {
            res.data.data.forEach((v, i) => {
              v.name = i + 1;
              v.boolean = true;
              v.state = v.state == 1 ? true : false;
            });

            this.tableData = res.data.data;
            this.total = res.data.total;
          });
        }
      });
    },
    DelBtn(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          ShopListDel(row.id).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              ShopListGet(this.currentPage, this.pageSize).then(res => {
                res.data.data.forEach((v, i) => {
                  v.name = i + 1;
                  v.boolean = true;
                  v.state = v.state == 1 ? true : false;
                });

                this.tableData = res.data.data;
                this.total = res.data.total;
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    AddClass() {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.shopclass {
  background-color: white;
  margin: 15px 15px 0 15px;
  .box {
    line-height: 40px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
    .el-button {
      margin: 15px 15px 0 0;
    }
  }
}
</style>