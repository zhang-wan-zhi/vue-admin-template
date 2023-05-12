<template>
  <div class="app-container">
    <div class="seach">
      <el-input
        placeholder="岗位名称"
        v-model="seachValues.name"
        clearable
        style="width: 200px; margin-right: 20px"
      />
      <el-input
        placeholder="薪水"
        v-model="seachValues.salary"
        clearable
        style="width: 200px; margin-right: 20px"
      />
      <el-input
        placeholder="工作经验"
        v-model="seachValues.experience"
        clearable
        style="width: 200px; margin-right: 20px"
      />
      <el-date-picker
        v-model="seachValues.startTime"
        type="datetime"
        placeholder="创建时间"
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
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="salary" label="薪水" />
      <el-table-column prop="major" label="推荐专业" />
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
      :title="isEidt ? '修改岗位' : '添加岗位'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="岗位名称" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作地点" prop="address">
          <el-input
            v-model="form.address"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作经验" prop="experience">
          <el-input
            v-model="form.experience"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="推荐专业" prop="major">
          <el-input
            v-model="form.major"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="要求学位" prop="degree">
          <el-input
            v-model="form.degree"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="能力要求" prop="requirement">
          <el-input
            v-model="form.requirement"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="薪水" prop="salary">
          <el-input
            v-model="form.salary"
            autocomplete="off"
            style="width: 300px"
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
      baseUrl: "/job",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
};
</script>
