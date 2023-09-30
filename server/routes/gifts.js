import express from "express";
// import path from "path";    // Provides utilities for working with file and directory paths
// import { fileURLToPath } from "url";  // Provides utilities for converting between a file URL and a file path
// import giftData from "../data/gifts.js";
import GiftController from "../controllers/gifts.js";

// const __filename = fileURLToPath(import.meta.url);  // Converts the import.meta.url property to a file path
// const __dirname = path.dirname(__filename);    // Returns the directory name of a path

/**
 * The import.meta.url property is a special property that exposes the URL of the current module.
 * This URL can be used to determine the file path of the module file itself.
 */

// Create an Express router
const router = express.Router();

// Create a GET route at the '/' endpoint that responds with status code 200 and send a JSON of the giftData
// router.get('/', (req, res) => {
//     res.status(200).json(giftData);
// })
router.get('/', GiftController.getGifts);

// Create a GET route at the '/:giftId' endpoint that responds with status code 200 and send a JSON of the giftData
router.get('/:giftId', GiftController.getGiftById)

// Create a GET route at the '/:giftId' endpoint that responds with status code 200 and send the gift.html file
// router.get('/:giftId', (req, res) => {
//     res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'));
// })

// Export the router
export default router;