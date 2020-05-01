<!-- 充值订单 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>充值订单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="search" placeholder="请输入关键词查询" style="width:200px;"></el-input>
              <el-button type="primary" plain @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="createTime" label="订单日期"></el-table-column>
                <el-table-column prop="orderCode" label="订单号"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="amount" label="订单金额"></el-table-column>
                <el-table-column prop="payType" label="充值方式"></el-table-column>
               <!--  <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
    import { apiRechargeOrder } from '@/service/index'
    import { formatTimeString } from '@/config/utils'
    export default {
        data() {
            return {
                fileList: [],
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                updateDialog: false,
                form: {
                    name: ''
                },
                search: '',
                deleteId: '',
                updateId: ''
            }
        },
        created() {
            this.getData();
        },
        methods: {
            handleSearch() {
              this.cur_page = 1
              this.getData()
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
              apiRechargeOrder({
                name: this.search,
                pageNum: this.cur_page,
                pageSize: this.pageSize
              })
              .then((res) => {
                if(res.code == 200) {
                  this.tableData = res.data.list
                  this.total = res.data.total
                  this.tableData.forEach((item) => {
                    item.createTime = formatTimeString(item.createTime)
                    switch (item.payMethod) {
                      case 1:
                        item.payType = '支付宝'
                        break;
                      case 2:
                        item.payType = '微信'
                        break;
                      case 3:
                        item.payType = '淘宝网'
                        break;
                    }
                  })
                }
              })
            },
            addSchool(){
              this.editVisible = true
              this.form.name = ''
              this.fileList = []
            },
            // 添加服务
            saveEdit() {
              
            },
            handleEdit(index,row){
              this.updateDialog = true
              this.updateId = row.id
              this.form.name = row.name
            },
            updateService(){
              
            },
            handleDelete(row){
              
            },
            // 确定删除
            deleteRow(){
               
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
<style>
  .el-upload--text{
     border:none !important;
     text-align: left;
     margin-left: 10px;
     height:50px;
    }  
</style>
