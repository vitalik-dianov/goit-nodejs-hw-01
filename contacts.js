const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const path = require('path');
const contactPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const result = JSON.parse(await fs.readFile(contactPath, 'utf8'));
    console.table(result);
    return;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactPath, 'utf8'));
    const result = data.find(contact => contact.id === contactId);
    console.table(result);
    return;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactPath, 'utf8'));
    const newData = data.filter(contact => contact.id !== contactId);
    console.log(`Removed contact id - '${contactId}'`);
    console.table(newData);
    fs.writeFile(contactPath, JSON.stringify(newData));
    return;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = JSON.parse(await fs.readFile(contactPath, 'utf8'));
    const newData = [...data, { id: uuidv4(), name, email, phone }];
    console.table(newData);
    fs.writeFile(contactPath, JSON.stringify(newData));
    return;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
