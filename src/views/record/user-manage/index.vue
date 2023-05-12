<template>
  <div class="app-container">
    <div class="seach">
      <el-input
        placeholder="姓名或者账号"
        v-model="seachValues.keyWord"
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

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="status" label="账号状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            @change="handleSwitch(scope)"
          >
          </el-switch>
        </template>
      </el-table-column>
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
      :title="isEidt ? '修改用户' : '添加用户'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :label-width="formLabelWidth" ref="form">
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input
            v-model="form.sex"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model="form.age"
            autocomplete="off"
            style="width: 300px"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input
            v-model="form.telephone"
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
import { changeStatus } from "@/api/user";
export default {
  mixins: [listMixin],

  data() {
    return {
      baseUrl: "/user",
      // dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleSwitch(scope) {
      changeStatus({ id: scope.row.id })
        .then((res) => {
          if (res.code === "200") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "修改失败",
              type: "error",
            });
          }
        })
        .finally(() => {
          this.initMixin();
        });
    },
  },
};
</script>
