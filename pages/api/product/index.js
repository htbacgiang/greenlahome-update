import db from "../../../utils/db";
import Products from "../../../models/Product";
db.connectDb();


const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;
    case "POST":
      await createProduct(req, res);
      break;
  }
};

export default handler;

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();

    res.json({
      status: "success",
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};


