var express = require('express');
var router = express.Router();
require('dotenv').config();
const axios = require('axios'); 
const { Configuration, OpenAIApi } = require("openai");
const db = require("../model/helper");
const userShouldBeLoggedIn = require('../guard/userShouldBeLoggedIn');


const openaikey = process.env.OPENAI_KEY;

const configuration = new Configuration({
    apiKey: openaikey,
});
const openai = new OpenAIApi(configuration);

//Get the AI response based on the user input:
/* router.post('/', async (req, res, next) => {
    const { input } = req.body;
    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      max_tokens: 10,
      messages: [
        {
          role: 'system',
          content: 'You are a nutrition and health assistant.',
        },
        {
          role: 'user',
          content: input,
        },
      ],
    });
    res.send({
      output: result.data.choices[0].message.content,
    });
  }); */

  //Get an AI response based on the user preference:
  router.post('/', userShouldBeLoggedIn, async (req, res, next) => {
    try {
        const query = await db(`SELECT preference FROM profiles WHERE id = ${req.id};`);
        console.log(query);
        const preference = query.data[0].preference;

        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613',
            //prompt: preference, //this breaks my code
            max_tokens: 400, //can increase later
            temperature: 0.6, 
            messages: [
              {
                role: 'system',
                content: 'You are a nutrition and health assistant. You generate simple recipes based on the user preferences. Try to generate a different recipe each time the output is generated.', //system gives any instructions to the assistant bot
              },
              {
                role: 'user',
                content: `My eating preferences are ${preference}`,
              },
            ],
          });
        
          res.send({
            output: completion.data.choices[0].message.content
          });
    
    } catch (error) {
        res.status(500).send(error.message);
    }
  });

module.exports = router;