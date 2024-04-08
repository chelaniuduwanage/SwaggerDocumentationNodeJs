const express = require ('express');
const { addDistrict,getAllDistricts,deleteDistrict} = require('../controllers/district.controller');
const {verifyJWT} = require('../middleware/verifyJWT');
const { nanoid } = require("nanoid");

// To this:
import("nanoid/non-secure").then(({ nanoid }) => {
    // Now you can use nanoid here
}).catch(error => {
    // Handle any potential errors with the dynamic import
    console.error("Error importing nanoid:", error);
});

    const router=express.Router();

/**
 * @swagger
 * /district/insertDistrict:
 *   post:
 *     summary: Add district
 *     description: Add a new district to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties of your district object here
 *     responses:
 *       '200':
 *         description: District added successfully.
 *       '401':
 *         description: Unauthorized - JWT token not provided.
 *       '500':
 *         description: Internal server error.
 */
router.post('/insertDistrict', verifyJWT, addDistrict);

/**
 * @swagger
 * /district/viewDistricts:
 *   get:
 *     summary: View all districts
 *     description: Retrieve all districts from the database.
 *     responses:
 *       '200':
 *         description: Successful operation.
 *       '401':
 *         description: Unauthorized - JWT token not provided.
 *       '500':
 *         description: Internal server error.
 */
router.get('/viewDistricts', getAllDistricts);

/**
 * @swagger
 * /district/delete/{id}:
 *   delete:
 *     summary: Delete district
 *     description: Delete a district from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: District ID
 *     responses:
 *       '200':
 *         description: District deleted successfully.
 *       '401':
 *         description: Unauthorized - JWT token not provided.
 *       '404':
 *         description: District not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/delete/:id', verifyJWT, deleteDistrict);

module.exports = router;
