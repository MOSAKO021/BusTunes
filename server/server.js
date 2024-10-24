const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const axios = require('axios')
const cheerio = require('cheerio');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Session middleware setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Default route - GET
app.get('/', (req, res) => {
  res.send('PaNi ChUsKo Ra PuLkA!');
});

app.post('/submit', async (req, res) => {
    const { data } = req.body;
  
    try {
      const response = await axios.get(data);
  
      const $ = cheerio.load(response.data);

        const title = $('title').text();
  
      
  
    //   res.send({ message: 'Filtered data', data: filteredData });
        res.status(200).json(title);
  
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send({ error: 'Failed to fetch data from the URL' });
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
