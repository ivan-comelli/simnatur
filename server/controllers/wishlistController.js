const { Favorite, Product } = require('../models');
const addItemWishlist = async (req, res) => {
    const { id } = req.body; 
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    try {
        if(id) {
            const favoriteItem = await Favorite.findOne({ where: { userId: userId, productId: id } });
            if (favoriteItem) {
                // Si se encuentra el elemento, puedes manejar la lógica correspondiente
                return res.status(409).json({
                    success: false,
                    message: 'Item found in wishlist',
                });
            } else {
                const newItem = await Favorite.create({
                    userId: userId,
                    productId: id,
                });
                // Si no se encuentra el elemento, maneja la lógica correspondiente
                return res.status(200).json({
                    success: true,
                    message: 'Item add in wishlist',
                    data: newItem
                });
            }
        }
        else {
            return res.status(404).json({
                success: false,
                message: 'ID Item not found in wishlist',
            });
        }
    } catch (error) {
        console.error('Error finding item in wishlist:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while searching for the item',
        });
    }
}

const getWishlistItems = async (req, res) => {
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    try {
        // Buscar todos los elementos de la lista de deseos del usuario
        const wishlistItems = await Favorite.findAll({ 
            where: { userId: userId },
            include: [{
              model: Product, // Incluir información del producto asociado
            }],
            attributes: [],
          });
        
        
        if (wishlistItems.length > 0) {
            // Si se encuentran elementos, devolver la lista de elementos de la lista de deseos
            return res.status(200).json({
                success: true,
                message: 'Wishlist items found',
                data: wishlistItems.map(item => {
                    const {images, ...rest} = item.Product.dataValues
                    const Img = JSON.parse(images);
                    return {
                        ...rest,
                        images: Img
                    }
                  })
            });
        } else {
            // Si no se encuentran elementos, devolver un mensaje indicando que no se encontraron elementos
            return res.status(404).json({
                success: false,
                message: 'No wishlist items found for this user',
            });
        }
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching wishlist items',
        });
    }
}

const removeItemWishlist = async (req, res) => {
    const id = req.params.id; 
    const userId = req.userId;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    
    try {
        // Verificar si existe el elemento en la lista de deseos
        const favoriteItem = await Favorite.findOne({ where: { userId: userId, productId: id } });
        
        if (favoriteItem) {
            // Si se encuentra el elemento, proceder a eliminarlo
            await favoriteItem.destroy();
            
            return res.status(200).json({
                success: true,
                message: 'Item removed from wishlist',
            });
        } else {
            // Si no se encuentra el elemento, devolver un mensaje indicando que no se encontró
            return res.status(404).json({
                success: false,
                message: 'Item not found in wishlist',
            });
        }
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while removing the item from wishlist',
        });
    }
};



module.exports = { addItemWishlist, getWishlistItems, removeItemWishlist };
