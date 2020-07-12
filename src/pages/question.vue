<!-- 常见问题设置 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>常见问题设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" plain @click="handleAdd">添加问题</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="createTime" label="创建日期" sortable width="130"></el-table-column>
                <el-table-column prop="outTid" label="菜单" width="130"></el-table-column>
                <el-table-column prop="outTid" label="问题" width="130"></el-table-column>
                <el-table-column prop="amount" label="答案"></el-table-column>
                <el-table-column label="操作" width="160">
                   <template slot-scope="scope">
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
          title="添加问题"
          :visible.sync="dialogVisible"
          width="500px">
          <el-form ref="form" label-width="80px">
            <el-form-item label="所属菜单">
              <el-select v-model="form.menu" placeholder="请选择所属菜单">
                <el-option label="论文查重经验" :value="1"></el-option>
                <el-option label="论文查重经验" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="问题">
              <el-input v-model="form.q" placeholder="请输入问题"></el-input>
            </el-form-item>
            <el-form-item label="答案">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入答案"
                v-model="form.content">
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
            form: {
              menu: 1,
              q: '',
              content: ''
            }
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
              this.$confirm('是否确定删除当前问题?', '提示', {
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
</style>
