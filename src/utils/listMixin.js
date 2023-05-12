import { postApi } from "@/api/list";
import store from "@/store";

export const listMixin = {
  data() {
    return {
      baseUrl: "",
      dialogFormVisible: false,
      isEidt: false,
      isDetail: false,
      form: {},
      list: null,
      listLoading: true,
      seachValues: {},
    };
  },
  mounted() {
    this.initMixin();
  },
  watch: {
    dialogFormVisible(n, o) {
      if (!n) {
        // 隐藏时
        this.form = {};
        this.isEidt = false;
        this.isDetail = false;
      }
    },
  },
  methods: {
    initMixin() {
      // 获取列表
      postApi(this.baseUrl + "/list", { id: store.getters.id })
        .then((res) => {
          console.log(res);
          this.list = res.data.records;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    // 添加item
    handleAdd() {
      this.dialogFormVisible = true;
    },
    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid) => {
        console.log("valid", valid);
        if (valid) {
          const { id } = this.form;
          const data = {
            ...this.form,
            userId: store.getters.id,
            id,
          };
          // 判断是添加还是修改
          const url = this.isEidt
            ? this.baseUrl + "/update"
            : this.baseUrl + "/add";
          postApi(url, data).then((res) => {
            console.log(res);
            if (res.code === "200") {
              this.$message({
                message: this.isEidt ? "修改成功" : "添加成功",
                type: "success",
              });
              this.form = {};
              this.dialogFormVisible = false;
              // 刷新页面
              this.initMixin();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击详情
    handleDetail(scope) {
      // 获取详情

      postApi(this.baseUrl + "/info", { id: scope.row.id }).then((res) => {
        console.log(res);
        this.dialogFormVisible = true;
        // 页面打开再修改状态
        this.isDetail = true;
        this.form = res.data;
        // this.list = res.data.records;
      });
    },
    // 点击修改
    handleChange(scope) {
      postApi(this.baseUrl + "/info", { id: scope.row.id }).then((res) => {
        console.log(res);
        this.dialogFormVisible = true;
        // 页面打开再修改状态
        this.isEidt = true;
        this.form = res.data;
        // this.list = res.data.records;
      });
    },
    // 点击删除
    handleDelete(scope) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          postApi(this.baseUrl + "/delete", { id: scope.row.id }).then(
            (res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.initMixin();
              // this.list = res.data.records;
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 点击搜索
    handleSearch() {
      this.listLoading = true;
      postApi(this.baseUrl + "/list", {
        ...this.seachValues,
        id: store.getters.id,
      })
        .then((res) => {
          console.log(res);
          this.list = res.data.records;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    handleReset() {
      this.seachValues = {};
      this.initMixin();
    },
  },
};
