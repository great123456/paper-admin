<!-- 用户管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-input v-model="name" clearable placeholder="请输入用户名" style="width:200px;"></el-input>
              <el-date-picker
                    v-model="date"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
               </el-date-picker>
              <el-button type="primary" plain @click="getData">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="typeValue" label="注册类型"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="amount" label="账号余额"></el-table-column>
                <el-table-column label="操作" width="160">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
        
        <!-- 修改用户信息 -->
        <el-dialog title="修改账号" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                 <el-form-item label="金额">
                    <el-input v-model="form.amount"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateRegisterUserInfo">修改</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiUserList,apiUpdeteRegisterInfo, apiDeleteRegisterInfo } from '@/service/index'
    import { formatTimeString } from '@/config/utils'
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                is_search: false,
                editVisible: false,
                form: {
                  name: '',
                  email: '',
                  amount: 0,
                  password: ''
                },
                name: '',
                date: [],
                deleteId: ''
            }
        },
        created() {
            this.getData();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
              let startTime = ''
              let endTime = ''
              if(this.date && this.date.length){
                startTime = this.date[0]
                endTime = this.date[1]
              }
              apiUserList({
                pageNum: this.cur_page,
                pageSize: this.pageSize,
                startTime: startTime,
                endTime: endTime,
                name: this.name
              })
              .then((res) => {
                if(res.code == 200){
                  this.total = res.data.total
                  this.tableData = res.data.list
                  this.tableData.forEach(function(item){
                    item.createTime = formatTimeString(item.createTime)
                    switch (item.type) {
                      case 0:
                        item.typeValue = '账号'
                        break;
                      case 1:
                        item.typeValue = 'QQ登录'
                        break;
                      default:
                        item.typeValue = '微信登录'
                        break;
                    }
                  })
                }
              })
            },
            handleEdit(row){
              this.editVisible = true
              this.form = row
            },
            updateRegisterUserInfo() {
              apiUpdeteRegisterInfo({
                email: this.form.email,
                id: this.form.id,
                name: this.form.name,
                amount: this.form.amount,
                password: this.form.password
              })
              .then((res) => {
                if(res.code == 200){
                  this.editVisible = false
                  this.$message.success('修改成功')
                  this.getData()
                }
              })
            },
            handleDelete(row){
              this.$confirm('确定删除当前注册用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                apiDeleteRegisterInfo({
                  id: row.id
                })
                .then((res) => {
                  if(res.code == 200){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    this.getData()
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
            },
            // 保存图文
            saveEdit() {
              
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
