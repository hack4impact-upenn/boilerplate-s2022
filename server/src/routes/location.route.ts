/**
 * Specifies the middleware and controller functions to call for each route
 * relating to authentication.
 */
import express from 'express';
import {
    getLocations,
    addLocation,
    deleteLocation,
} from '../controllers/location.controller.ts';
import 'dotenv/config';

const router = express.Router();

router.post('/add-location', addLocation);
router.delete('/delete-location', deleteLocation);
router.get('/get-locations', getLocations);

export default router;
