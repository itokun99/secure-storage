import { storage } from "../src";

const getUser = () => {
  // const t = storage.get("oke_siap");
  storage.save("arthur", { message: "1231231" });

  // console.log("t", t);
};

getUser();
