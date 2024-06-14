const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


//CREATE

router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});



//Update cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    console.log('Received request to update cart:', req.params.id);


    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        
        console.log('cart updated successfully:', updatedCart);
        res.status(200).json(updatedCart);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json(err);
    }
});

//delete
 router.delete("/:id",  verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Cartrt.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
 });

 //get user cart
 router.get("/find/:useerId", verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }
 });

 //get all cart
 router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});

 



module.exports = router