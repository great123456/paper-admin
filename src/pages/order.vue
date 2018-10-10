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
              <el-input v-model="orderNo" placeholder="请输入订单号" style="width:200px;"></el-input>
              <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
               </el-date-picker>
               <el-select v-model="checkId" placeholder="请选择监测类型" @change="selectType">
                  <el-option
                    v-for="item in checkList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
              </el-select>
              <el-button type="primary" plain>搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="created_at" label="订单日期" sortable width="200"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="room_no" label="检测类型"></el-table-column>
                <el-table-column prop="order_no" label="订单编号"></el-table-column>
                <el-table-column prop="total" label="字数"></el-table-column>
                <el-table-column prop="productName" label="实际收入"></el-table-column>
                <el-table-column prop="productPrice" label="成本"></el-table-column>
                <el-table-column prop="productPrice" label="状态"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { apiOrderList } from '@/service'
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
                date: '',
                orderNo: '',
                typeId: 1,
                tableData: [],
                cur_page: 1,
                pageSize: 10,
                total: 0,
                select_cate: '',
                select_word: '',
                is_search: false
            }
        },
        created() {
            this.getData();
        },
        computed: {

        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                apiOrderList({
                    type: this.typeId,
                    page: this.cur_page
                })
                .then((res) => {
                    console.log('res-order',res.data)
                    this.tableData = res.data.list
                    this.tableData.forEach(function(item){
                        item.type = item.type == 1?'美食订单':'服务订单'
                        item.productName = item.detail[0].name
                        item.productPrice = item.detail[0].price
                        item.productAmount = item.detail[0].amount
                    })
                    this.total = res.data.total
                })
            },
            selectType(){
              this.getData()
            },
            search() {
                this.is_search = true;
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
