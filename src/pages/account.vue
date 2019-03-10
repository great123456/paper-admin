<!-- 账号管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>账号管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-button type="primary" plain @click="addAccount">添加账号</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="创建时间"></el-table-column>
                <el-table-column prop="name" label="账号名称"></el-table-column>
                <el-table-column prop="name" label="账号密码"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

        <!-- 添加账号 -->
        <el-dialog title="添加账号" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAccount">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改账号 -->
        <el-dialog title="修改账号" :visible.sync="dialogUpdate" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="账号密码">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdate = false">取 消</el-button>
                <el-button type="primary" @click="updateCookBook">修改</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import { apiAddAccount } from '@/service'
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                editVisible: false,
                dialogUpdate: false,
                form: {
                  name: '',
                  password: ''
                },
                deleteId: '',
                updateId: ''
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
              
            },
            addAccount(){
              this.editVisible = true
              this.form.name = ''
              this.form.password = ''
            },
            // 添加账号
            saveAccount() {
              apiAddAccount({
                name: this.form.name,
                password: this.form.password
              })
              .then((res) => {
                if(res.code == 200){
                  this.$message.success('添加成功')
                  this.editVisible = false
                }
              })
            },
            handleEdit(index,row){
              this.dialogUpdate = true
              this.form.name = row.name
              this.updateId = row.id
              this.fileList = []
            },
            updateCookBook(){
               
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
