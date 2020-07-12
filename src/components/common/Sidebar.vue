<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'type',
                        title: '价格设置'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'order',
                        title: '订单列表'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'submit',
                        title: '手工提交'
                    },
                    // {
                    //     icon: 'el-icon-bell',
                    //     index: 'check',
                    //     title: '降重管理'
                    // },
                    {
                        icon: 'el-icon-bell',
                        index: 'recharge',
                        title: '充值订单'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'fee',
                        title: '用户管理'
                    },
                    {
                        icon: 'el-icon-picture',
                        index: 'banner',
                        title: 'banner管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'setting',
                        title: '论文降重设置'
                    },
                    {
                        icon: 'el-icon-question',
                        index: 'question',
                        title: '常见问题设置'
                    },
                    {
                        icon: 'el-icon-goods',
                        index: 'account',
                        title: '账号管理'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
