
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
  try {

    const inputArray = req.body.array;

    
    const { f_name, date, id, roll_no } = req.body;

    
    const user_id = `${f_name}_${date.split('-').join('')}`;

    
    const evenno = [];
    const oddno = [];
    const Upperletter = [];

    
    inputArray.forEach((element) => {
      if (typeof element === 'number') {
        if (element % 2 === 0) {
          evenno.push(element);
        } else {
          oddno.push(element);
        }
      } else if (typeof element === 'string') {
        const letters = element.split('');
        letters.forEach((letter) => {
          if (/[a-zA-Z]/.test(letter)) {
            Upperletter.push(letter.toUpperCase());
          }
        });
      }
    });

    
    const response = {
      user_id,
      id,
      roll_no,
      is_success: true,
      even_numbers: evenno,
      odd_numbers: oddno,
      uppercase_letters: Upperletter,
    };

    
    res.status(200).json(response);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
