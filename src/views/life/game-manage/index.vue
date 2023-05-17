<template>
  <div class="app-container">
    <div class="seach">
      <el-input
        placeholder="游戏名称"
        v-model="seachValues.name"
        clearable
        style="width: 200px; margin-right: 20px"
      />
      <el-input
        placeholder="游戏类型"
        v-model="seachValues.type"
        clearable
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
      <el-table-column prop="name" label="游戏名称" />
      <el-table-column prop="type" label="游戏类型" />

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
      :title="isEidt ? '修改游戏' : '添加游戏'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="游戏名称" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏类型" prop="type">
          <el-input
            v-model="form.type"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏连接" prop="url">
          <el-input
            v-model="form.url"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="游戏介绍" prop="introduction">
          <div class="example">
            <quill-editor
              class="editor"
              v-if="!isDetail"
              v-model="form.introduction"
              :options="editorOption"
            />
            <div class="output ql-snow">
              <div class="ql-editor" v-html="this.form.introduction"></div>
            </div>
          </div>
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
      baseUrl: "/game",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: {
            container: [["link", "image", "bold", "italic", "strike"]],
          },
        },
        placeholder: "请输入内容",
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.example {
  display: flex;
  height: 30rem;

  .editor,
  .output {
    width: 50%;
    height: 100%;
  }

  $toolbar-height: 57px;

  .editor {
    padding-bottom: $toolbar-height;
  }

  .output {
    // border: none;

    border: 1px solid #ccc;

    .title {
      height: $toolbar-height;
      line-height: $toolbar-height;
      padding-left: 10px;
      border-bottom: 1px solid #ccc;
    }

    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-left: none;
      border-radius: 0;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
