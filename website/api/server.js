// backend/server.js
require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON bodies

// The API endpoint that the React form will send data to
app.post('/api/submit-to-google-sheet', async (req, res) => {
  const formData = req.body;

  try {
    // --- Google Sheets Authentication ---
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json', // The path to your credentials file
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    const authClient = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: authClient });
    const spreadsheetId = process.env.SPREADSHEET_ID;

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
      new Date().toISOString(), // Optional: Add a timestamp
    ];

    // --- Append Data to the Sheet ---
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:G', // The range to append to. 'Sheet1' is the default sheet name.
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});