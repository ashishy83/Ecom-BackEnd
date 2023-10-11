const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User id is required"],
    },
    
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Product id is required"],
        },
        quantity:{
            type: Number,
            required: [true, 'Quantity is required'],
        },

    
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;