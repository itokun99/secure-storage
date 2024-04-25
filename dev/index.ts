import { http } from "../src";

const userServices = {
  list: http.get("https://jsonplaceholder.typicode.com/users", function () {
    return {
      params: {
        other: "oke",
      },
      metaParams: {
        page: 1,
      },
    };
  }),
};

userServices.list();
