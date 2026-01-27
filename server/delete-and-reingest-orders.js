/**
 * Script to delete all orders from the database and reingest from Typeform
 *
 * Usage:
 * 1. Make sure you have axios installed: npm install axios
 * 2. Set TYPEFORM_API_KEY in your .env file
 * 3. Update EMAIL and PASSWORD below
 * 4. Run: node delete-and-reingest-orders.js
 */

const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:4000';
const FORM_ID = 'X3HYI3Te'; // Typeform form ID
const EMAIL = 'your-email@example.com'; // Update with your email
const PASSWORD = 'your-password'; // Update with your password

// Create axios instance that handles cookies
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function deleteAndReingestOrders() {
  try {
    console.log('Step 1: Logging in...');

    // Login first
    const loginResponse = await axiosInstance.post('/api/auth/login', {
      email: EMAIL,
      password: PASSWORD,
    });

    console.log('✓ Login successful');
    console.log('User:', loginResponse.data);

    console.log('\nStep 2: Deleting all orders from database...');

    // Delete all orders
    const deleteResponse = await axiosInstance.delete('/api/orders/all');

    console.log('✓ Deletion successful!');
    console.log('Deleted orders:', deleteResponse.data.deletedCount);

    console.log('\nStep 3: Ingesting orders from Typeform...');

    // Call the ingest endpoint
    const ingestResponse = await axiosInstance.post(
      `/api/orders/ingest/${FORM_ID}`,
    );

    console.log('✓ Ingestion successful!');
    console.log('\nResponse:', JSON.stringify(ingestResponse.data, null, 2));

    console.log('\n✅ Complete! All orders have been deleted and reingested.');
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.status, error.response.statusText);
      console.error('Response:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

deleteAndReingestOrders();
