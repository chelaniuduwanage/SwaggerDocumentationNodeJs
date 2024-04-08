const express = require ('express');
const { addWeatherRecord,deleteWeatherRecord,getExpiredWeatherForecasts,getNonExpiredWeatherForecasts,deleteAllWeather } = require('../controllers/weatherCast.controller');
const {verifyJWT} = require('../middleware/verifyJWT');
const {verifyAuthKey}= require('../middleware/verifyAuthKey');
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
 * /wcast/addData:
 *   post:
 *     summary: Add weather data
 *     description: Add weather data to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties of your weather data object here
 *     responses:
 *       '200':
 *         description: Weather data added successfully.
 *       '401':
 *         description: Unauthorized - Auth key not provided.
 *       '500':
 *         description: Internal server error.
 */
router.post('/addData', verifyAuthKey, addWeatherRecord);

/**
 * @swagger
 * /wcast/delete/{id}:
 *   delete:
 *     summary: Delete weather data
 *     description: Delete weather data from the database by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Weather data ID
 *     responses:
 *       '200':
 *         description: Weather data deleted successfully.
 *       '401':
 *         description: Unauthorized - JWT token not provided.
 *       '404':
 *         description: Weather data not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/delete/:id', verifyJWT, deleteWeatherRecord);

/**
 * @swagger
 * /wcast/delete:
 *   delete:
 *     summary: Delete all weather data
 *     description: Delete all weather data from the database.
 *     responses:
 *       '200':
 *         description: All weather data deleted successfully.
 *       '401':
 *         description: Unauthorized - Auth key not provided.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/delete', verifyAuthKey, deleteAllWeather);

/**
 * @swagger
 * /wcast/getoldData:
 *   get:
 *     summary: Get expired weather forecasts
 *     description: Retrieve expired weather forecasts from the database.
 *     responses:
 *       '200':
 *         description: Successful operation.
 *       '401':
 *         description: Unauthorized - JWT token not provided.
 *       '500':
 *         description: Internal server error.
 */
router.get('/getoldData', verifyJWT, getExpiredWeatherForecasts);

/**
 * @swagger
 * /wcast/getData:
 *   get:
 *     summary: Get non-expired weather forecasts every 5 minites
 *     description: Retrieve non-expired and updated weather forecasts from the database.
 *     responses:
 *       '200':
 *         description: Successful operation.
 *       '401':
 *         description: Unauthorized - JWT token not provided.
 *       '500':
 *         description: Internal server error.
 */
router.get('/getData', verifyJWT, getNonExpiredWeatherForecasts);

module.exports = router;