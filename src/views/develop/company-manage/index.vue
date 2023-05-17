<template>
  <div class="app-container">
    <el-button type="primary" style="margin-bottom: 20px" @click="handleAdd"
      >添加</el-button
    >
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="name" label="公司名称" />
      <el-table-column prop="address" label="公司所在地" />
      <el-table-column prop="telephone" label="联系方式" />
      <el-table-column prop="introduction" label="公司简介" />

      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDetail(scope)"
            >详情</el-button
          >
          <el-button type="text" size="small" @click="handleChange(scope)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope)"
            >删除
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- dialog -->
    <el-dialog
      :title="isEidt ? '修改公司信息' : '添加公司信息'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="公司名称" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司所在地" prop="address">
          <el-input
            v-model="form.address"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input
            v-model="form.telephone"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司简介" prop="introduction">
          <el-input
            v-model="form.introduction"
            autocomplete="off"
            style="width: 300px"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 7 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!isDetail" type="primary" @click="submitForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMixin } from "@/utils/listMixin.js";
export default {
  mixins: [listMixin],

  data() {
    return {
      baseUrl: "/company",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
};
</script>
