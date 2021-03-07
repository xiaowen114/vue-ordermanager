<template>
  <div class="acclist">
    <span class="box">账号列表</span>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"> </el-table-column>
      <el-table-column label="账号" width="200" prop="account">
      </el-table-column>
      <el-table-column prop="userGroup" label="用户组" width="300">
      </el-table-column>
      <el-table-column
        prop="ctime"
        label="创建时间"
        width="300"
      ></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button>编辑</el-button>
          <el-button type="danger" @click="Delbtn(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <el-button size="small" type="danger" @click="BatchDelete"
      >批量删除</el-button
    >
    <el-button size="small" type="primary" @click="deselect"
      >取消选择</el-button
    >
  </div>
</template>

<script>
import moment from "moment";
import { GetAcconutList, DelAccount, BatchDeleteA } from "@/api/apis.js";
export default {
  data() {
    return {
      arr1: [],
      currentPage: 1,
      pageSize: 4,
      total: 10,
      tableData: []
    };
  },
  created() {
    this.GetDate();
  },
  methods: {
    deselect() {
      this.$refs.multipleTable.clearSelection();
    },
    //点击批量删除
    BatchDelete() {
      this.$confirm("是否确定批量删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          BatchDeleteA(JSON.stringify(this.arr1)).then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.GetDate();
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
    GetDate() {
      GetAcconutList(this.currentPage, this.pageSize).then(res => {
        console.log(res);
        res.data.data.forEach(v => {
          v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
        });
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleSelectionChange(arr) {
      let arr1 = arr.map(v => {
        return v.id;
      });
      this.arr1 = arr1;
    }, //当选择项发生改变 触发事件

    Delbtn(row) {
      DelAccount(row.id).then(res => {
        if (res.data.code == 0) {
          this.GetDate();
        }
      });
    },
    handleSizeChange(a) {
      this.pageSize = a;
      this.GetDate();
    },
    handleCurrentChange(a) {
      this.currentPage = a;
      this.GetDate();
    }
  }
};
</script>

<style lang="less" scoped>
.acclist {
  background-color: white;
  margin: 15px 15px 0 15px;
  .box {
    line-height: 40px;
    margin-left: 20px;
  }
  .el-pagination {
    margin: 10px 0;
  }
}
</style>