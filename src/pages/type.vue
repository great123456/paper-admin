<!-- 论文检测类型 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>价格设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <!-- <el-select v-model="cateId" placeholder="请选择客房服务" @change="selectService">
                  <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-button type="primary" plain @click="addSchool">添加服务产品</el-button> -->
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="type" label="检测类型" sortable></el-table-column>
                <el-table-column prop="name" label="原价"></el-table-column>
                <el-table-column prop="price" label="现价"></el-table-column>
                <el-table-column prop="price" label="加价方式"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.$index, scope.row)">设置价格</el-button>
                     <!--  <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        
        <div class="price-record">
          <p>价格调整记录</p>
          <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
              <el-table-column prop="time" label="调整时间" sortable></el-table-column>
              <el-table-column prop="name" label="原价变动"></el-table-column>
              <el-table-column prop="price" label="后台手动调整"></el-table-column>
              <el-table-column prop="price" label="调整账号"></el-table-column>
          </el-table>
        </div>

        <!-- 修改检测类型价格 -->
        <el-dialog title="编辑价格" :visible.sync="updateDialog" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="百分比">
                    <el-input-number v-model="form.num" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="特殊资源">
                    <el-radio-group v-model="form.type">
                      <el-radio label="1" value="1">直接设置价格</el-radio>
                      <el-radio label="2" value="2">百分比</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updateDialog = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">修改</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
  import {  } from '@/service/index'
    export default {
        data() {
            return {
                cateList: [],
                cateId: '',
                fileList: [],
                tableData: [{
                  type: '万方'
                }],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                updateDialog: false,
                form: {
                    name: '',
                    price: '',
                    num: 10,
                    type: '1'
                },
                deleteId: '',
                updateId: ''
            }
        },
        created() {
            this.getServiceList()
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
            handleChange(){

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
            getServiceList(){
               
            },
            selectService(){
               this.getData()
            },
            getData() {
              
            },
            search() {
                this.is_search = true;
            },
            addSchool(){
              
            },
            // 添加服务产品
            saveEdit() {
              
            },
            handleEdit(index,row){
              this.updateDialog = true
              this.updateId = row.id
              this.form.name = row.name
              this.form.price = row.price
            },
            updateServiceManage(){
              
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
    .price-record{
      margin-top: 100px;
    }
    .price-record p{
      margin-bottom: 10px;
      color: #606266;
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
