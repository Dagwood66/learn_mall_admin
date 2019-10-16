<template>
    <el-container>
        <el-aside>
            <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-setting"></i>
                    <span slot="title">商品列表</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">订单列表</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                Main
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>