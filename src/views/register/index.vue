<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="name">
        <el-input
          ref="name"
          v-model="registerForm.name"
          placeholder="姓名"
          name="name"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="account">
        <el-input
          ref="account"
          v-model="registerForm.account"
          placeholder="学号"
          name="account"
          type="text"
          tabindex="2"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="sex">
        <el-select
          v-model="registerForm.sex"
          placeholder="性别"
          :style="{ width: '100%' }"
        >
          <el-option key="hypk01" label="男" value="hypk01"> </el-option>
          <el-option key="hypk02" label="女" value="hypk02"> </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="age">
        <el-input
          ref="age"
          v-model="registerForm.age"
          placeholder="年龄"
          name="age"
          type="number"
          tabindex="3"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="telephone">
        <el-input
          ref="telephone"
          v-model="registerForm.telephone"
          placeholder="联系方式"
          name="telephone"
          type="text"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="major">
        <el-input
          ref="major"
          v-model="registerForm.major"
          placeholder="专业"
          name="major"
          type="text"
          tabindex="5"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          placeholder="密码"
          name="password"
          tabindex="6"
          auto-complete="on"
          @keyup.enter.native="handleregister"
        />
      </el-form-item>
      <el-form-item prop="repetition">
        <el-input
          :key="passwordType"
          ref="repetition"
          v-model="registerForm.repetition"
          placeholder="确认密码"
          name="repetition"
          tabindex="7"
          auto-complete="on"
          @keyup.enter.native="handleregister"
        />
      </el-form-item>

      <el-button
        type="primary"
        style="width: 100%; margin-left: 0px; margin-bottom: 25px"
        @click.native.prevent="goBack"
        >返回</el-button
      >

      <el-button
        type="primary"
        style="width: 100%; margin-left: 0px"
        @click.native.prevent="handleregister"
        :loading="loading"
        >注册</el-button
      >

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { register } from "@/api/user";

export default {
  name: "register",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能小于6位数"));
      } else {
        callback();
      }
    };
    const validateRepetition = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能小于6位数"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        name: "",
        password: "",
        repetition: "",
        account: "",
        sex: "",
        age: null,
        telephone: "",
        major: "",
      },
      registerRules: {
        name: [{ required: true, trigger: "blur", message: "姓名不能为空" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        repetition: [
          {
            required: true,
            trigger: "blur",
            validator: validateRepetition,
          },
        ],
        account: [
          {
            required: true,
            trigger: "blur",
            message: "学号不能为空",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleregister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          register(this.registerForm)
            .then((res) => {
              console.log(res);
              this.$message({
                message: "注册成功",
                type: "success",
                duration: 1000,
              });
              this.$router.push({ path: "/login" });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
