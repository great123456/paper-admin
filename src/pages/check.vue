<!-- 菜品管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>降重管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
             <!--  <el-select v-model="cateId" placeholder="请选择菜谱" @change="selectCook">
                  <el-option
                    v-for="item in cateList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-button type="primary" plain @click="addSchool">添加菜品</el-button> -->
              <el-button type="primary" plain @click="addType">添加类别</el-button>
            </div>

            <div>
              <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                  <el-table-column prop="created_at" label="创建时间"></el-table-column>
                  <el-table-column prop="name" label="降重类型"></el-table-column>
                  <el-table-column prop="content" label="价格"></el-table-column>
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
            
            <div class="crumbs">
              <el-breadcrumb separator="/">
                  <el-breadcrumb-item><i class="el-icon-tickets"></i>人工降重订单</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="date" label="订单日期"></el-table-column>
                <el-table-column prop="price" label="订单价格"></el-table-column>
                <el-table-column prop="type" label="降重类型"></el-table-column>
                <el-table-column prop="created_ata" label="用户名"></el-table-column>
                <el-table-column prop="created_ata" label="订单编号"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="">下载</el-button>
                      <el-button
                         size="mini"
                         type="primary"
                         @click="">上传</el-button>
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
                    <el-input v-model="form.price"></el-input>
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
                    <el-input v-model="form.price"></el-input>
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
    import { } from '@/service/index'
    export default {
        data() {
            return {
                cateList: [],
                cateId: '',
                fileList: [],
                tableData: [{
                  date: '2018-10-03'
                }],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                editRoomVisible: false,
                updateDialog: false,
                form: {
                    name: '',
                    price: ''
                },
                deleteId: '',
                updateId: ''
            }
        },
        created() {
            
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
            getData() {
               
            },
            // 确定删除
            handleDelete(){
              
            },
            addType(){
              this.editVisible = true
            },
            saveEdit(){

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
