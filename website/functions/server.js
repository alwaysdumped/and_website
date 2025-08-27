// backend/functions/server.js
const functions = require("firebase-functions");
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true })); // Enable CORS for all origins
app.use(express.json()); // Middleware to parse JSON bodies

// --- Securely get credentials from Firebase environment configuration ---
// IMPORTANT: You must set these using the Firebase CLI before deploying.
// See previous instructions on using `firebase functions:config:set`.
const config = functions.config().google;

// --- Google Sheets Authentication ---
const auth = new google.auth.GoogleAuth({
  // Use the credentials set in the Firebase environment config
  credentials: {
    client_email: config.client_email,
    // The private key must have newlines restored
    private_key: config.private_key.replace(/\\n/g, '\n'),
  },
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});
const spreadsheetId = config.spreadsheet_id; // Get Spreadsheet ID from config

// The API endpoint that the React form will send data to
app.post('/api/submit-to-google-sheet', async (req, res) => {
  const formData = req.body;

  try {
    const authClient = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: authClient });

    // --- Prepare Data for Google Sheets ---
    // Converts the domain array into a comma-separated string
    const domainString = formData.domain.join(', ');

    // The values to append, matching the order of your sheet headers
    const rowValues = [
      formData.name,
      formData.email,
      formData.id,
      formData.phone,
      domainString,
      formData.otherDomain,
      new Date().toISOString(), // Adds a timestamp
    ];

    // --- Append Data to the Sheet ---
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:G', // The range to append to
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowValues],
      },
    });

    res.status(200).json({ message: 'Submission successful!' });
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    res.status(500).json({ message: 'Error submitting to Google Sheets', error });
  }
});

// Expose the Express app as a single Cloud Function called "api".
// This means you do not need app.listen(), as Firebase handles the server.
exports.api = functions.https.onRequest(app);