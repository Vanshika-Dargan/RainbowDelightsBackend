import express from "express";
import { getproduct, getproductbyid, addproduct ,updateproduct , deleteproduct} from "../controllers/productDetails.js";
const route = express.Router();

route.get("/all", getproduct);

route.get("/:id", getproductbyid);

route.post("/add", addproduct);

route.put("/update/:id", updateproduct);

route.delete("/delete/:id", deleteproduct);

export default route;
