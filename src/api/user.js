import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/admin/login ",
    method: "post",
    data,
  });
}

export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}

// 注册
export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

// 改变用户状态
export function changeStatus(data) {
  return request({
    url: "/user/change-status",
    method: "post",
    data,
  });
}
