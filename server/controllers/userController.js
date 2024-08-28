const { User } = require('../models');

const getUsers = async (req, res) => {
  //DATOS PERSONALES DEL USUARIO PARA FACTURACION Y ENVIOS
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePersonalDataUser = async (req, res) => {
  const { name, lastName, birtday, phone, document } = req.body;
  try {
    //SOLO SE PUEDE ACTUALIZAR SI NO EXISTEN LOS DATOS
    //EVENTUALMENTE VA A VER PROTOCOLO PARA CAMBIAR CIERTOS DATOS
    const user = await User.findByPk(req.userId);
    user.name = 
    user.lastName =
  } catch (error) {

  }
}

const updateAddressBookUser = async (req, res) => {
  const { street, city, detail, cp } = req.body;
  try {
    const user = await User.findByPk(req.userId);
    
  } catch (error) {

  }
}

module.exports = { getUsers };
