import express from 'express';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';

let users = [];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         mobile:
 *           type: string
 *           description: The mobile number of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         pincode:
 *           type: string
 *           description: The pincode of the user
 */

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', (req, res) => {
    res.send(users);
});

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/', (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`${user.first_name} has been added to the Database`);
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
        res.send(foundUser);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);

    if (users.length < initialLength) {
        res.send(`${id} deleted successfully from the database`);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update the user by the id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was updated
 *       404:
 *         description: The user was not found
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, mobile, address, pincode } = req.body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
        if (first_name) users[userIndex].first_name = first_name;
        if (last_name) users[userIndex].last_name = last_name;
        if (email) users[userIndex].email = email;
        if (mobile) users[userIndex].mobile = mobile;
        if (address) users[userIndex].address = address;
        if (pincode) users[userIndex].pincode = pincode;

        res.send(`User with ID ${id} has been updated`);
    } else {
        res.status(404).send({ message: 'User not found' });
    }
});

export default router;
