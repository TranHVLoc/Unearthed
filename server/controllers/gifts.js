/**
 * This file is to store the controller functions to perform CRUD operations on the gifts data.
 */

import { pool } from "../config/database.js";

/**
 * Function to get all the gifts from the database
 * @param {*} req 
 * @param {*} res 
 */
const getGifts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gifts ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

/**
 * Function to get a gift by id
 * @param {*} req 
 * @param {*} res 
 */
const getGiftById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn
        FROM gifts
        WHERE id=$1
        `;
        const giftId = req.params.giftId;
        const results = await pool.query(selectQuery, [giftId])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message} )
    }
}

/**
 * Function to create a new gift
 * @param {*} req 
 * @param {*} res 
 */
const createGift = async (req, res) => {
    try {
        // Get the data from the request body
        const { name, pricePoint, audience, image, description, submittedBy, submittedOn } = req.body;
        // Insert the data into the database
        const insertQuery = `
            INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`;
        const results = await pool.query(insertQuery, [name, pricePoint, audience, image, description, submittedBy, submittedOn]);
        // Return the data to the client
        res.status(201).json(results.rows[0]);
    } catch (error) {
        // If there is an error, return the error to the client
        res.status(409).json({ error: error.message });
    }
}

/**
 * Function to update a gift
 * @param {*} res 
 * @param {*} req 
 */
const updateGift = async (res, req) => {
    try {
        // Get the data from the request body
        const giftId = parseInt(req.params.giftId);
        const { name, pricePoint, audience, image, description, submittedBy, submittedOn } = req.body;
        // Update the data in the database
        const updateQuery = `
            UPDATE gifts
            SET name=$1, pricePoint=$2, audience=$3, image=$4, description=$5, submittedBy=$6, submittedOn=$7
            WHERE id=$8`;
        const results = await pool.query(updateQuery, [name, pricePoint, audience, image, description, submittedBy, submittedOn, giftId]);
        // Return the data to the client
        res.status(200).json(results.rows[0]);
    } catch (error) {
        // If there is an error, return the error to the client
        res.status(409).json({ error: error.message });
    }
}

/**
 * Function to delete a gift
 * @param {*} res
 * @param {*} req 
 */
const deleteGift = async (res, req) => {
    try {
        // Get the data from the request body
        const giftId = parseInt(req.params.giftId);
        // Delete the data from the database
        const deleteQuery = `DELETE FROM gifts WHERE id=$1`;
        const results = await pool.query(deleteQuery, [giftId]);
        // Return the data to the client
        res.status(200).json(results.rows[0]);
    } catch (error) {
        // If there is an error, return the error to the client
        res.status(409).json({ error: error.message });
    }
}

export default {
    getGifts,
    getGiftById,
    createGift,
    updateGift,
    deleteGift
}