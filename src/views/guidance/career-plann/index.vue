<template>
  <div class="app-container">
    <div class="seach">
      <el-input
        placeholder="学号或者姓名"
        v-model="seachValues.keyword"
        clearable
        style="width: 200px; margin-right: 20px"
      />
      <el-input
        placeholder="专业"
        v-model="seachValues.major"
        clearable
        style="width: 200px; margin-right: 20px"
      />

      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="account" label="学号" />
      <el-table-column prop="major" label="专业" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.status === '0'"
            type="primary"
            disable-transitions
            >待评估</el-tag
          >
          <el-tag
            v-if="scope.row.status === '1'"
            type="success"
            disable-transitions
            >已评估</el-tag
          >
          <el-tag
            v-if="scope.row.status === '2'"
            type="danger"
            disable-transitions
            >失效</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="档案时间" />

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDetail(scope)"
            >详情</el-button
          >
          <el-button type="text" size="small" @click="handleGuide(scope)"
            >指导</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog
      :title="isEidt ? '档案' : '档案'"
      :visible.sync="dialogFormVisible"
      width="60%"
    >
      <div style="height: 60vh; overflow-y: scroll; padding: 10px">
        <el-descriptions title="学生信息" border>
          <el-descriptions-item label="姓名">{{
            form.name
          }}</el-descriptions-item>
          <el-descriptions-item label="学号">{{
            form.account
          }}</el-descriptions-item>
          <el-descriptions-item label="专业">{{
            form.major
          }}</el-descriptions-item>
          <el-descriptions-item label="档案状态">
            <el-tag
              v-if="form.status === '0'"
              type="primary"
              disable-transitions
              >待评估</el-tag
            >
            <el-tag
              v-if="form.status === '1'"
              type="success"
              disable-transitions
              >已评估</el-tag
            >
            <el-tag v-if="form.status === '2'" type="danger" disable-transitions
              >失效</el-tag
            >
          </el-descriptions-item>
          <el-descriptions-item label="联系方式"
            >{{ form.telephone }} 1188 号</el-descriptions-item
          >
        </el-descriptions>
        <el-descriptions
          title="学生档案"
          :column="1"
          style="margin-top: 20px"
          border
        >
          <el-descriptions-item
            v-for="(item, index) in form.answerList"
            :key="index"
            :label="item.question"
            >{{ item.answer }}</el-descriptions-item
          >
        </el-descriptions>
        <el-descriptions
          title="指导记录"
          :column="1"
          style="margin-top: 20px"
          border
        >
        </el-descriptions>
        <div v-for="(item, index) in form.guideList" :key="index">
          <el-descriptions :column="3" style="margin-top: 20px" border>
            <el-descriptions-item label="指导人">{{
              item.userId
            }}</el-descriptions-item>
            <el-descriptions-item label="指导时间">{{
              item.createTime
            }}</el-descriptions-item>
            <el-descriptions-item label="连接类型"
              ><el-tag
                v-if="item.type === '0'"
                type="primary"
                disable-transitions
                >文本</el-tag
              >
              <el-tag
                v-if="item.type === '1'"
                type="success"
                disable-transitions
                >文章
              </el-tag>
              <el-tag v-if="item.type === '2'" type="danger" disable-transitions
                >课程</el-tag
              ><el-tag
                v-if="item.type === '3'"
                type="danger"
                disable-transitions
                >游戏</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="指导意见">{{
              item.content
            }}</el-descriptions-item>
          </el-descriptions>
          <el-button type="danger" round style="margin-top: 10px"
            >删除</el-button
          >
        </div>
      </div>
    </el-dialog>
    <!-- dialog修改指导意见 -->
    <el-dialog
      title="添加指导意见"
      :visible.sync="dialogFormVisible2"
      width="60%"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="连接类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指导内容" prop="content">
          <el-input
            type="textarea"
            v-model="form.content"
            autocomplete="off"
            style="width: 300px"
            :autosize="{ minRows: 4, maxRows: 7 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button v-if="!isDetail" type="primary" @click="submitGuideForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMixin } from "@/utils/listMixin.js";
import { postApi } from "@/api/list";
export default {
  mixins: [listMixin],

  data() {
    return {
      baseUrl: "/record",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
      dialogFormVisible2: false,
      options: [
        {
          value: "0",
          label: "文本",
        },
        {
          value: "1",
          label: "文章",
        },
        {
          value: "2",
          label: "课程",
        },
        {
          value: "3",
          label: "游戏",
        },
      ],
    };
  },
  methods: {
    // 添加指导意见
    handleGuide(scope) {
      console.log("111", scope.row);
      this.form = {
        recordId: scope.row.id,
        studentId: scope.row.account,
      };
      this.dialogFormVisible2 = true;
    },
    // 提交指导意见
    submitGuideForm() {
      postApi("/record/add-guide", this.form).then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.form = {};
          this.dialogFormVisible2 = false;
          // 刷新页面
          this.initMixin();
        }
      });
    },
  },
};
</script>
