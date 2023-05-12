import request from "@/utils/request";
import store from "@/store";

export function postApi(url, data) {
  // data.id = store.getters.id;
  return request({
    url,
    method: "post",
    data,
  });
}
