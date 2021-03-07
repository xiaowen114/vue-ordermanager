<template>
  <div class="order">
    <div class="box">
      <!-- 表单 -->
      <el-form
        ref="searchForm"
        :model="searchForm"
        size="mini"
        :inline="true"
        :rules="rules"
      >
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input
            v-model="searchForm.orderNo"
            placeholder="订单号"
          ></el-input>
        </el-form-item>
        <el-form-item label="收货人">
          <el-input v-model="searchForm.person" placeholder="收货人"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchForm.orderyes">
            <el-option value="派送中">派送中</el-option>
            <el-option value="已完成">已完成</el-option>
            <el-option value="已受理">已受理</el-option>
          </el-select>
        </el-form-item>

        <!-- 选择时间 -->
        <el-time-picker
          size="mini"
          is-range
          v-model="searchForm.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        >
        </el-time-picker>
        <el-button type="primary" size="mini" @click="search">查询</el-button>
        <el-button size="mini" @click="resetForm">重置</el-button>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="150">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="200">
        </el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="120">
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120">
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small" @click="editBtn(scope.row)"
              >编辑</el-button
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

      <!-- 查看模态框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>这里渲染点击按钮获得的数据</span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 编辑模态框 -->
      <el-dialog
        title="修改订单"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <el-form label-width="100px" :model="listform">
          <el-form-item label="订单号">
            <el-input v-model="listform.orderNo"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-input v-model="listform.deliveryTime"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="listform.phone"></el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input v-model="listform.consignee"></el-input>
          </el-form-item>
          <el-form-item label="配送地址">
            <el-input v-model="listform.deliverAddress"></el-input>
          </el-form-item>
          <el-form-item label="送达时间">
            <el-input v-model="listform.orderTime"></el-input>
          </el-form-item>
          <el-form-item label="用户备注">
            <el-input v-model="listform.remarks"></el-input>
          </el-form-item>
          <el-form-item label="订单金额">
            <el-input v-model="listform.orderAmount"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-input v-model="listform.orderState"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determineBtn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { orderlist, OrderListDetails, OrderListSet } from "@/api/apis.js";
import moment from "moment";
export default {
  data() {
    return {
      rules: {},
      //获取订单详情
      listform: {},
      // 模态框的显示与隐藏
      centerDialogVisible: false,
      searchForm: {
        orderNo: "",
        person: "",
        phone: "",
        orderyes: "",
        date: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
      },
      tableData: [],
      //每页条数
      pageSize: 4,
      currentPage: 1,
      total: 20,
      dialogVisible: false
    };
  },
  created() {
    orderlist({
      currentPage: this.currentPage,
      pageSize: this.pageSize
    }).then(res => {
      let data = res.data.data;

      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });

      this.tableData = data;
      this.total = res.data.total;
    });
  },
  methods: {
    resetForm() {
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        let data = res.data.data;

        data.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
          v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
        });

        this.tableData = data;
        this.total = res.data.total;
      });
    },
    //确定修改订单
    determineBtn() {
      console.log(this.listform);

      OrderListSet(
        this.listform.id,
        this.listform.orderNo,
        this.listform.orderTime,
        this.listform.phone,
        this.listform.consignee,
        this.listform.deliverAddress,
        this.listform.deliveryTime,
        this.listform.remarks,
        this.listform.orderAmount,
        this.listform.orderState
      ).then(res => {
        if (res.data.code == 0) {
          this.centerDialogVisible = false;
          orderlist({
            currentPage: this.currentPage,
            pageSize: this.pageSize
          }).then(res => {
            let data = res.data.data;

            data.forEach(v => {
              v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
              v.deliveryTime = moment(v.deliveryTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
            });

            this.tableData = data;
            this.total = res.data.total;
          });
        } else {
          this.centerDialogVisible = false;
        }
      });
    },
    editBtn(row) {
      OrderListDetails({ id: row.id }).then(res => {
        this.listform = row;
      });
      this.centerDialogVisible = true;
    },
    search() {
      let params = {};
      params.currentPage = this.currentPage;
      params.pageSize = this.pageSize;
      if (!(this.searchForm.orderNo == ""))
        params.orderNo = this.searchForm.orderNo;
      if (!(this.searchForm.person == ""))
        params.consignee = this.searchForm.person;
      if (!(this.searchForm.phone == "")) params.phone = this.searchForm.phone;
      if (!(this.searchForm.orderyes == ""))
        params.orderState = this.searchForm.orderyes;
      if (!(this.searchForm.date == "")) {
        params.data = JSON.stringify(this.searchForm.date);
      } else {
        params.data = "";
      }

      orderlist(params).then(res => {
        let data = res.data.data;

        data.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
          v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
        });

        this.tableData = data;
        this.total = res.data.total;
      });
    },
    handleSizeChange(a) {
      this.pageSize = a;
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        let data = res.data.data;

        data.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
          v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
        });

        this.tableData = data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(a) {
      console.log(a);
      this.currentPage = a;
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        let data = res.data.data;
        console.log(data);

        data.forEach(v => {
          v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
          v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
        });

        this.tableData = data;
        this.total = res.data.total;
      });
    },
    handleClick(a) {
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.order {
  .box {
    margin: 15px 15px;

    background-color: white;
    /deep/ .el-form {
      padding: 15px 15px 20px 15px;
      .el-button {
        margin-left: 20px;
      }
    }
  }
  /deep/ .cell {
    font-weight: normal;
  }
}
</style>