<!-- 论文检测订单管理 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
              <el-select v-model="typeId" placeholder="请选择订单类型" @change="selectType">
                  <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
              </el-select>
              <div style="margin-top: 20px;"></div>
              <el-input v-model="orderNo" clearable placeholder="请输入订单号" style="width:200px;"></el-input>
              <el-input v-model="name" clearable placeholder="请输入用户名" style="width:200px;"></el-input>
              <el-date-picker
                    v-model="date"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
               </el-date-picker>
               <!-- <el-select v-model="checkId" placeholder="请选择监测类型" @change="selectType">
                  <el-option
                    v-for="item in checkList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
               </el-select> -->
              <el-button type="primary" plain @click="getData">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="createTime" label="订单日期" sortable width="130"></el-table-column>
                <el-table-column prop="outTid" label="订单编号" width="130"></el-table-column>
                <el-table-column prop="amount" label="订单金额"></el-table-column>
                <el-table-column prop="memberName" label="用户名"></el-table-column>
                <el-table-column prop="paperTypeName" label="检测类型"></el-table-column>
                <el-table-column prop="wordCount" label="字数"></el-table-column>
                <el-table-column prop="productName" label="实际收入"></el-table-column>
                <el-table-column prop="productPrice" label="成本"></el-table-column>
                <el-table-column prop="typeValue" label="状态"></el-table-column>
                <el-table-column label="操作" width="160">
                   <template slot-scope="scope">
                      <el-button
                         size="mini"
                         type="primary"
                         @click="handleDowload(scope.row)">下载</el-button>
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

    </div>
</template>

<script>
    import { apiOrderList, apiDeleteOrder } from '@/service'
    import { formatTimeString } from '@/config/utils'
    import axios from 'axios'
    export default {
        data() {
            return {
                typeList: [{
                    label: '用户订单',
                    id: 1
                },{
                    label: '后台订单',
                    id: 2
                }],
                checkList: [{
                   label: '全部',
                   id: '' 
                },{
                    label: '万方',
                    id: 1
                },{
                    label: '知网',
                    id: 2
                }],
                checkId: 1,
                date: [],
                orderNo: '',
                typeId: 1,
                tableData: [],
                name: '',
                cur_page: 1,
                pageSize: 10,
                total: 0
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
                  this.tableData.forEach(function(item){
                     item.createTime = formatTimeString(item.createTime)
                     switch (item.type) {
                       case 0:
                         item.typeValue = '开始监测';
                         break;
                       case 1:
                         item.typeValue = '完成';
                         break;
                       case 2:
                         item.typeValue = '取消';
                         break;
                       case 3:
                         item.typeValue = '检测中';
                         break;
                       case 4:
                         item.typeValue = '检测中';
                         break;
                       case 5:
                         item.typeValue = '报告已删除';
                         break;
                       default:
                         item.typeValue = '暂停';
                         break;
                     }
                  })
                }
              })
            },
            handleDowload(row){
              let url = '/admin/order/downloadReport?orderId='+row.id
              axios({
                method: 'get',
                url: url,
                responseType: 'blob'
              })
              .then(response => {
                // loading.close()
                console.log(response)
                let headers = response.headers
                let fileName = headers['content-disposition'].split('=')[1]
                fileName = decodeURIComponent(fileName)
                let dowloadUrl = window.URL.createObjectURL(new Blob([response.data]))
                let link = document.createElement('a')
                link.style.display = 'none'
                link.href = dowloadUrl
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
              })
              .catch((error) => {
                console.log(error)
                this.$message('论文正在排队检测中。')
              })
            },
            handleDelete(row) {
              this.$confirm('是否确定删除当前订单?', '提示', {
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
