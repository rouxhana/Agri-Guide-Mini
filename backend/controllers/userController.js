const { users } = require('../utils/mockDB');

exports.getProfile = async (req, res) => {
  try {
    const user = users.find(u => u._id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    res.json(userWithoutPassword);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, location, soilType, landSize } = req.body;

    let userIndex = users.findIndex(u => u._id === req.user.id);

    if (userIndex !== -1) {
      // Update
      users[userIndex] = {
        ...users[userIndex],
        ...(name && { name }),
        ...(location && { location }),
        ...(soilType && { soilType }),
        ...(landSize && { landSize })
      };
      
      const userWithoutPassword = { ...users[userIndex] };
      delete userWithoutPassword.password;
      return res.json(userWithoutPassword);
    }

    res.status(404).json({ message: 'User not found' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
