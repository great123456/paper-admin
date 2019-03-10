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
              <!-- <el-button type="primary" plain @click="addSchool">添加类别</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="type" label="账号类型"></el-table-column>
                <el-table-column prop="content" label="邮箱"></el-table-column>
                <el-table-column prop="content" label="账号余额"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
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

        <!-- 添加类型 -->
        <el-dialog title="添加类型" :visible.sync="editVisible" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="类型名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="价格">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 编辑类型 -->
        <el-dialog title="添加类型" :visible.sync="editRoomVisible" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="类型名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="价格">
                    <el-input v-model="form.link"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editRoomVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {  } from '@/service/index'
    export default {
        data() {
            return {
                fileList: [],
                tableData: [],
                cur_page: 1,
                pageSize: 5,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                editRoomVisible: false,
                form: {
                    name: '',
                    link: '',
                    date: '',
                    address: ''
                },
                deleteId: ''
            }
        },
        created() {
            this.getData();
        },
        computed: {
           token(){
             return {
               Authorization: `bearer ${localStorage.getItem('admin-token')}`
             }
           }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleRemoveMain(file, fileList) {
                this.fileList = fileList
            },
            handleChangeMain(file, fileList){
              this.fileList = fileList
            },
            checkImage(url){
              window.open(url)
            },
            getData() {
              
            },
            handleEdit(){
              
            },
            handleDelete(row){
              
            },
            addSchool(){
              this.editVisible = true
              this.form.name = ''
              this.form.link = ''
              this.fileList = []
            },
            search() {
                this.is_search = true;
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
