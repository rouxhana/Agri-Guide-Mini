const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'users.json');

const loadUsersFromFile = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading users.json:', err);
  }
  return [];
};

const initialUsers = loadUsersFromFile();

const saveUsersToFile = (arr) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(arr, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing users.json:', err);
  }
};

// Create a reactive proxy around the users array so any push/mutation auto-saves to disk
const users = new Proxy(initialUsers, {
  set(target, prop, value) {
    target[prop] = value;
    saveUsersToFile(target);
    return true;
  }
});

const pendingRegistrations = [];

module.exports = {
  users,
  pendingRegistrations,
  saveUsersToFile
};
