import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/vue-admin-template/table/list",
    method: "get",
    params,
  });
}

// 新建问卷题目的时候需要获取新的问卷编号
export function getNewQuestionnaireId(data) {
  return request({
    url: "/questionnaire/get-serial",
    method: "post",
    data,
  });
}
