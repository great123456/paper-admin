<!-- 论文降重图标和文本设置 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>论文降重图标和文本设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" plain @click="handleAdd">添加</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="createTime" label="创建日期" sortable width="130"></el-table-column>
                <el-table-column prop="outTid" label="展示图标" width="130">
                  <template slot-scope="scope">
                    
                  </template>
                </el-table-column>
                <el-table-column prop="title" label="文本标题"></el-table-column>
                <el-table-column prop="amount" label="文本内容"></el-table-column>
                <el-table-column label="操作" width="160">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.row)">编辑</el-button>
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>


        <el-dialog
          title="添加设置"
          :visible.sync="dialogVisible"
          width="500px">
          <el-form ref="form" label-width="80px" class="form">
            <el-form-item label="图标">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleUploadSuccess">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="文本标题">
              <el-input v-model="title" placeholder="请输入文本标题"></el-input>
            </el-form-item>
            <el-form-item label="文本内容">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="content">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    // import { apiOrderList, apiDeleteOrder } from '@/service'
    import { formatTimeString } from '@/config/utils'
    import axios from 'axios'
    export default {
        data() {
          return {
            dialogVisible: false,
            tableData: [{
              createTime: '2020-10-03'
            }],
            name: '',
            cur_page: 1,
            pageSize: 10,
            total: 0,
            type: 1,
            imageUrl: '',
            title: '',
            content: ''
          }
        },
        created() {
          // this.getData();
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleUploadSuccess(res, file) {

            },
            getData() {
              let startTime = ''
              let endTime = ''
              if(this.date && this.date.length){
                startTime = this.date[0]
                endTime = this.date[1]
              }
              apiOrderList({
                pageNum: this.cur_page,
                pageSize: this.pageSize,
                name: this.name, // 用户名
                startTime: startTime,
                endTime: endTime,
                orderCode: this.orderNo,
                orderSource: this.typeId // 1：前台用户，2：后台用户
              })
              .then((res) => {
                if(res.code == 200){
                  this.total = res.data.total
                  this.tableData = res.data.list
                }
              })
            },
            handleAdd() {
              this.dialogVisible = true
            },
            handleEdit(row) {
              this.dialogVisible = true
            },
            handleDelete(row) {
              this.$confirm('是否确定删除当前设置?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                apiDeleteOrder({
                  orderId: row.id
                })
                .then((res) => {
                  if(res.code == 200){
                    this.getData()
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
            },
            selectType(){
              
            },
            // 保存编辑
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
  .form /deep/ .avatar-uploader .el-upload {
    width: 130px;
    height: 130px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
</style>
