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
              
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="paperTypeName" label="检测类型" width="150"></el-table-column>
                <el-table-column prop="unitNum" label="数量"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="supplyPrice" label="原价"></el-table-column>
                <el-table-column prop="price" label="现价"></el-table-column>
                <el-table-column prop="profit" label="利润"></el-table-column>
                <el-table-column prop="formula" label="加价倍数"></el-table-column>
                <el-table-column prop="modifyTypeValue" label="加价方式"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleEdit(scope.row)">设置价格</el-button>
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
          <div class="container">
            <p class="price-record-title">今日供货价格</p>
            <div class="table-content">
              <div class="table-content-item" :class="{'br-right':index == priceList1.length - 1}" v-for="(item,index) in priceList1">
                <p class="table-item-title">{{item.paperTypeName}}</p>
                <p>{{item.supplyPrice}}元/{{item.unitNum}}{{item.unit}}</p>
              </div>
            </div>
            <div class="table-content">
              <div class="table-content-item" :class="{'br-right':index == priceList2.length - 1}" v-for="(item,index) in priceList2">
                <p class="table-item-title">{{item.paperTypeName}}</p>
                <p>{{item.supplyPrice}}元/{{item.unitNum}}{{item.unit}}</p>
              </div>
            </div>
            <div class="table-content">
              <div class="table-content-item" :class="{'br-right':index == priceList3.length - 1}" v-for="(item,index) in priceList3">
                <p class="table-item-title">{{item.paperTypeName}}</p>
                <p>{{item.supplyPrice}}元/{{item.unitNum}}{{item.unit}}</p>
              </div>
            </div>
            <div class="table-content">
              <div class="table-content-item" :class="{'br-right':index == priceList4.length - 1}" v-for="(item,index) in priceList4">
                <p class="table-item-title">{{item.paperTypeName}}</p>
                <p>{{item.supplyPrice}}元/{{item.unitNum}}{{item.unit}}</p>
              </div>
            </div>
            <div class="table-content">
              <div class="table-content-item" :class="{'br-right':index == priceList5.length - 1}" v-for="(item,index) in priceList5">
                <p class="table-item-title">{{item.paperTypeName}}</p>
                <p>{{item.supplyPrice}}元/{{item.unitNum}}{{item.unit}}</p>
              </div>
            </div>
            <div class="table-content">
              <div class="table-content-item" :class="{'br-right':index == priceList6.length - 1}" v-for="(item,index) in priceList6">
                <p class="table-item-title">{{item.paperTypeName}}</p>
                <p>{{item.supplyPrice}}元/{{item.unitNum}}{{item.unit}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="price-record">
          <div class="container">
            <p class="price-record-title">价格调整记录</p>
            <el-table :data="recordList" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="createTime" label="调整时间"></el-table-column>
                <el-table-column prop="originPrice" label="原价变动"></el-table-column>
                <el-table-column prop="updatePrice" label="后台手动调整"></el-table-column>
                <el-table-column prop="changeUserName" label="调整账号"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleRecordCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="recordTotal">
                </el-pagination>
            </div>
          </div>
        </div>

        <!-- 修改检测类型价格 -->
        <el-dialog title="编辑价格" :visible.sync="updateDialog" width="500px">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="加价方式">
                    <el-radio-group v-model="form.modifyType">
                      <el-radio :label="2" :value="2">加价比例</el-radio>
                      <el-radio :label="1" :value="1">直接设置价格</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="现价">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="加价比例" v-show="form.modifyType == 2">
                    <el-input-number v-model="form.num" @change="handleChange" :min="1" :max="100" label="加价比例"></el-input-number>
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
  import { apiPriceList, apiPriceSetting, apiUpdatePrice, apiPriceRecordList } from '@/service/index'
  import { formatTimeString } from '@/config/utils'
    export default {
        data() {
            return {
                priceList1: [],
                priceList2: [],
                priceList3: [],
                priceList4: [],
                priceList5: [],
                priceList6: [],
                tableData: [],
                recordList: [],
                recordTotal: 0,
                currentPage: 1,
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                updateDialog: false,
                form: {
                    price: 0,
                    num: 1,
                    modifyType: 2
                },
                deleteId: '',
                updateId: ''
            }
        },
        created() {
            this.getPriceList()
            this.getPriceSettingList()
            this.getRecordList()
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getPriceSettingList();
            },
            handleRecordCurrentChange(val){
               this.currentPage = val
               this.getRecordList()
            },
            getRecordList() {
              apiPriceRecordList({
                pageNum: this.currentPage,
                pageSize: this.pageSize
              })
              .then((res) => {
                if(res.code == 200){
                  res.data.list.forEach(function(item){
                    item.createTime = formatTimeString(item.createTime)
                    item.originPrice = item.changeType == 1 ? '是': '否'
                    item.updatePrice = item.changeType == 1 ? '否': '是'
                  })
                  this.recordTotal = res.data.total
                  this.recordList = res.data.list
                }
              })
            },
            getPriceList() { // 获取今日供货价格
              apiPriceList({
                pageNum: 1,
                pageSize: 30
              })
              .then((res) => {
                 if(res.code == 200){
                   for(let i =0 ; i< res.data.list.length;i ++){
                     if(i < 5){
                       this.priceList1.push(res.data.list[i])
                     }
                     if(i >= 5 && i< 10){
                       this.priceList2.push(res.data.list[i])
                     }
                     if(i >= 10 && i< 15){
                       this.priceList3.push(res.data.list[i])
                     }
                     if(i >= 15 && i< 20){
                       this.priceList4.push(res.data.list[i])
                     }
                     if(i >= 20 && i< 25){
                       this.priceList5.push(res.data.list[i])
                     }
                     if(i >= 25 && i< 30){
                       this.priceList6.push(res.data.list[i])
                     }
                   }
                 }
              })
            },
            handleChange(){
 
            },
            getPriceSettingList(){
               apiPriceSetting({
                 pageNum: this.cur_page,
                 pageSize: this.pageSize
               })
               .then((res) => {
                 if(res.code == 200){
                   this.total = res.data.total
                   this.tableData = res.data.list
                   this.tableData.forEach(function(item){
                     if(item.modifyType){
                       item.modifyTypeValue = item.modifyType == 1 ? '价格设置':'公式'
                     }else{
                       item.modifyTypeValue = ''
                     }
                   })
                 }
               })
            },
            search() {
                this.is_search = true;
            },
            // 修改价格
            saveEdit() {
              apiUpdatePrice({
                formula: this.form.num,
                id: this.updateId,
                modifyType: this.form.modifyType,
                price: this.form.price
              })
              .then((res) => {
                if(res.code == 200){
                  this.$message.success('修改成功')
                  this.updateDialog = false
                  this.getPriceSettingList()
                }
              })
            },
            handleEdit(row){
              this.updateDialog = true
              this.updateId = row.id
              this.form.price = row.price
              this.form.num = row.formula
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
      margin-top: 30px;
    }
    .price-record-title{
      margin-bottom: 10px;
      color: #606266;
    }
    .table-content{
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
    }
    .table-content-item{
      flex: 1;
      text-align: center;
      border: 1px solid #ebeef5;
      line-height: 33px;
      border-right: none;
    }
    .br-right{
      border-right: 1px solid #ebeef5;
    }
    .table-item-title{
      border-bottom: 1px solid #ebeef5;
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
