<template>
  <div class="app-container">
    <div class="seach">
      <el-input
        placeholder="课程名称"
        v-model="seachValues.courseName"
        clearable
        style="width: 200px; margin-right: 20px"
      />
      <el-date-picker
        v-model="seachValues.startTime"
        type="datetime"
        placeholder="开始时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width: 200px; margin-right: 20px"
      />
      <el-date-picker
        v-model="seachValues.endTime"
        type="datetime"
        placeholder="结束时间"
        value-format="yyyy-MM-dd HH:mm:ss"
        style="width: 200px; margin-right: 20px"
      />

      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>
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
      <el-table-column prop="courseName" label="课程名称" />
      <el-table-column prop="type" label="课程类型" />
      <el-table-column prop="createUserName" label="创建人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作">
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
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog
      :title="isEidt ? '修改课程' : '添加课程'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="课程名称" prop="title">
          <el-input
            v-model="form.title"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程类型" prop="type">
          <el-input
            v-model="form.type"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" prop="introduction">
          <el-input
            v-model="form.introduction"
            autocomplete="off"
            style="width: 300px"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
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
      baseUrl: "/course",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
};
</script>
