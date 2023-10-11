import Product from "../model/Product";
import Cart from "../model/Cart";
import errorHandler from "../utils/errorHandlers";

//add to cart

export const updateCart = errorHandler(async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;
  if (userId) {
    if (quantity == 0) {
      await Cart.findOneAndDelete({ userId, productId });
      return res, json({ status: "Succes", message: "Product Removed" });
    }
    const updateCart = await Cart.findByIdAndUpdate(
      { productId, userId },
      { $inc: { quantity } },
      { new: true }
    );
    //update product stock
    if (updateCart) {
      return res.json(updateCart);
    }
    const cart = new Cart({ productId, userId, quantity });
    const result = await cart.save();
    return res, json(result);
  } else {
    res.json({ status: 404, message: "User not found" });
  }
});

//View Cart
export const viewCart = errorHandler(async (req, res) => {
  const userId = req.userId;
  if (userId) {
    const cart = await Cart.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productData",
        },
      },
    ]);
    return res.json(cart);
  } else {
    res.json({ status: "404", message: "User not Found" });
  }
});


//Get card Count

export const cartCount = errorHandler(
    async(req,res)=>{
        const userId = req.userId;
        const count = await Cart.countDocuments({userId});
        return res.json(count);
    }
)