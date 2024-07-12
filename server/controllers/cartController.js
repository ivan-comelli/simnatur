const { Cart, Product } = require('../models');

const addItemCart = async (req, res) => {
    const { id, quantity } = req.body;
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    
    try {
        // Si no se especifica la cantidad, se asume que es 1
        const itemQuantity = quantity ? parseInt(quantity) : 1;

        if (id) {
            // Verificar si el producto ya está en el carrito del usuario
            let cartItem = await Cart.findOne({ where: { userId: userId, productId: id } });
            
            if (cartItem) {
                // Si el producto ya está en el carrito, actualizar la cantidad
                cartItem.quantity += itemQuantity;
                await cartItem.save();
                
                return res.status(200).json({
                    success: true,
                    message: 'Cart item quantity updated',
                    data: cartItem
                });
            } else {
                // Si el producto no está en el carrito, añadirlo con la cantidad especificada o 1
                const newCartItem = await Cart.create({
                    userId: userId,
                    productId: id,
                    quantity: itemQuantity
                });
                
                return res.status(200).json({
                    success: true,
                    message: 'Item added to cart',
                    data: newCartItem
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'Missing productId in request body',
            });
        }
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while adding item to cart',
        });
    }
};


const getCartItems = async (req, res) => {
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    
    try {
        // Buscar todos los elementos del carrito del usuario
        const cartItems = await Cart.findAll({ 
            where: { userId: userId },
            include: [{
                model: Product, // Incluir información del producto asociado
            }],
            attributes: [],
        });
        
        if (cartItems.length > 0) {
            // Si se encuentran elementos, devolver la lista de elementos del carrito
            return res.status(200).json({
                success: true,
                message: 'Cart items found',
                data: cartItems.map(item => {
                    let {images, tag, category, ...rest} = item.Product.dataValues
                    const Img = JSON.parse(images);
                    tag = JSON.parse(tag);
                    category = JSON.parse(category);
                    return {
                        cartQuantity: 1,
                        tag,
                        category,
                        ...rest,
                        images: Img
                    }
                  })
            });
        } else {
            // Si no se encuentran elementos, devolver un mensaje indicando que no se encontraron elementos
            return res.status(404).json({
                success: false,
                message: 'No cart items found for this user',
            });
        }
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching cart items',
        });
    }
};

const removeItemCart = async (req, res) => {
    const id = req.params.id; 
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    
    try {
        // Verificar si existe el elemento en el carrito
        const cartItem = await Cart.findOne({ where: { userId: userId, productId: id } });
        
        if (cartItem) {
            // Si se encuentra el elemento, proceder a eliminarlo
            await cartItem.destroy();
            
            return res.status(200).json({
                success: true,
                message: 'Item removed from cart',
            });
        } else {
            // Si no se encuentra el elemento, devolver un mensaje indicando que no se encontró
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
        }
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while removing the item from cart',
        });
    }
};

const updateCartItem = async (req, res) => {
    const { id, quantity } = req.body;
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    
    try {
        // Verificar si existe el elemento en el carrito
        const cartItem = await Cart.findOne({ where: { userId: userId, id: id } });
        
        if (cartItem) {
            // Si se encuentra el elemento, actualizar la cantidad
            cartItem.quantity = parseInt(quantity);
            await cartItem.save();
            
            return res.status(200).json({
                success: true,
                message: 'Cart item quantity updated',
                data: cartItem
            });
        } else {
            // Si no se encuentra el elemento, devolver un mensaje indicando que no se encontró
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart',
            });
        }
    } catch (error) {
        console.error('Error updating item in cart:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the item in cart',
        });
    }
};

module.exports = { addItemCart, getCartItems, removeItemCart, updateCartItem };
