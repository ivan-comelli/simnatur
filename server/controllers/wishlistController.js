const { Favorite } = require('../models');

const addItemWishlist = async (req, res) => {
    const { id } = req.body; 
    const userId = req.user.id;  // Asumiendo que tienes el id del usuario logueado en `req.user.id`
    console.log("BODY: ", id)
    try {
        if(id) {
            const favoriteItem = await Favorite.findOne({ where: { userId: userId, productId: id } });
            if (favoriteItem) {
                // Si se encuentra el elemento, puedes manejar la lógica correspondiente
                return res.status(200).json({
                    success: true,
                    message: 'Item found in wishlist',
                    data: favoriteItem,
                });
            } else {
                // Si no se encuentra el elemento, maneja la lógica correspondiente
                return res.status(404).json({
                    success: false,
                    message: 'Item not found in wishlist',
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

module.exports = { addItemWishlist };
