import { pool } from './database.js'
import './dotenv.js'
import giftData from '../data/gifts.js'

/**
 * Reset the gifts table and populate it with the giftData
 */
const createGiftsTable = async () => {
    const createTabQuery = `
        DROP TABLE IF EXISTS gifts;

        CREATE TABLE IF NOT EXISTS gifts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            audience VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            submittedBy VARCHAR(255) NOT NULL,
            submittedOn TIMESTAMP NOT NULL
        );
    `;

    try {
        const res = await pool.query(createTabQuery);
        console.log('🎉 Gifts table created successfully');
    } catch (error) {
        console.error('⚠️ Error creating gifts table', error);
    }
}


/**
 * Seed the gifts table with the giftData
 */
const seedGiftsTable = async () => {
    await createGiftsTable();

    // Traverse the giftData array and insert each gift object into the gifts table
    giftData.forEach((gift) => {
        const insertQuery = {
            text: `
                INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `
        }
        // Define an array of values for the gift object
        const values = [
            gift.name,
            gift.pricePoint,
            gift.audience,
            gift.image,
            gift.description,
            gift.submittedBy,
            gift.submittedOn
        ];
    
        // Execute the query
        pool.query(insertQuery, values, (error, res) => {
            if (error) {
                console.error('⚠️ Error inserting gift', error);
                return;
            }
            
            console.log(`✅ ${gift.name} added successfully`);
        })
    })

}

// Invoke the seedGiftsTable function
seedGiftsTable();

