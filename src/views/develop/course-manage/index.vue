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
          <el-button type="text" size="small" @click="handleVideo(scope)"
            >添加小节视频</el-button
          >
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

    <el-dialog title="添加/修改小节视频" :visible.sync="dialogFormVisible2">
      <div class="video-list">
        <div class="video-item" v-for="item in videoList" :key="item.id">
          <div>
            {{ item.title }}
          </div>
          <div class="delete-cideo" @click="open(item.id)">删除</div>
        </div>
      </div>
      <el-form :model="form2" :label-width="formLabelWidth" ref="form2">
        <el-form-item
          :rules="[{ required: true, message: '视频名称不能为空' }]"
          label="视频名称"
          prop="title"
        >
          <el-input
            v-model="form2.title"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        action=""
        class="upload-demo"
        :limit="1"
        :file-list="fileList"
        :on-change="onChange"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMixin } from "@/utils/listMixin.js";
import { postApi } from "@/api/list";
import store from "@/store";
export default {
  mixins: [listMixin],

  data() {
    return {
      baseUrl: "/course",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
      dialogFormVisible2: false,
      videoList: [],
      fileList: [],
      form2: {},
      file: null,
      courseId: "",
    };
  },
  methods: {
    handleVideo(scope) {
      this.dialogFormVisible2 = true;
      console.log(" this.courseId", scope);
      if (!this.courseId) {
        this.courseId = scope.row.id;
      }
      postApi("/media/list", { courseId: this.courseId }).then((res) => {
        this.videoList = res.data.records;
      });
    },
    onChange(file, fileList) {
      this.file = file.raw;
      console.log("onChange", file, fileList);
    },
    submitVideo() {
      this.$refs.form2.validate((valid) => {
        if (valid) {
          const data = {
            multipartFile: this.file,
            courseId: this.courseId,
            userId: store.getters.id,
            title: this.form2.title,
          };
          const fromData = new FormData();
          for (const key in data) {
            fromData.append(key, data[key]);
          }
          postApi("/media/add", fromData).then((res) => {
            console.log("res", res);
            if (res.code === "200") {
              this.dialogFormVisible2 = false;
              this.form2 = {};
            }
          });
        }
      });
      console.log("fileList", this.fileList);
    },
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          postApi("/media/delete", { id }).then((res) => {
            if (res.code === "200") {
              this.handleVideo(this.courseId);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
.video-list {
}
.video-item {
  display: flex;
  margin-bottom: 10px;
}
.delete-cideo {
  cursor: pointer;
  color: red;
  margin-left: 10px;
}
</style>
