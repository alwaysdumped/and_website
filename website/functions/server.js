const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const { defineSecret } = require("firebase-functions/params");

const GOOGLE_CLIENT_EMAIL = defineSecret("GOOGLE_CLIENT_EMAIL");
const GOOGLE_PRIVATE_KEY = defineSecret("GOOGLE_PRIVATE_KEY");
const GOOGLE_SPREADSHEET_ID = defineSecret("GOOGLE_SPREADSHEET_ID");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/submit-to-google-sheet', async (req, res) => {
  const formData = req.body;
  try {
    const client_email = GOOGLE_CLIENT_EMAIL.value();
    const spreadsheetId = GOOGLE_SPREADSHEET_ID.value();
    const private_key = GOOGLE_PRIVATE_KEY.value().replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: client_email,
        private_key: private_key,
      },
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    if (!spreadsheetId || !client_email || !private_key) {
      throw new Error("Missing required environment variables for Google Sheets API.");
    }

    const authClient = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: authClient });
    const domainString = formData.domain ? formData.domain.join(', ') : '';
    const rowValues = [
      formData.name || '',
      formData.email || '',
      formData.id || '',
      formData.phone || '',
      domainString,
      formData.otherDomain || '',
      new Date().toISOString(),
    ];
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowValues],
      },
    });
    res.status(200).json({ message: 'Submission successful!' });
  } catch (error) {
    console.error('Detailed Error:', error);
    res.status(500).json({ message: 'Error submitting to Google Sheets', error: error.message });
  }
});

module.exports = app;