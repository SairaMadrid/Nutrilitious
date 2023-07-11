var express = require('express');
var router = express.Router();
require('dotenv').config();
const axios = require('axios'); 
const { Configuration, OpenAIApi } = require("openai");
const db = require("../model/helper");


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
  router.post('/:id', async (req, res, next) => {

    const { id } = req.params;
    try {
        const query = await db(`SELECT preference FROM profiles WHERE id = ${id};`);
        console.log('Query:', query);
        const preference = query.data[0].preference;
        console.log('Results:', preference);

        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613',
            //prompt: preference, //this breaks my code
            max_tokens: 350, //max length of the assistant's output
            temperature: 0.2, //how precise the assistant should be; if the value is higher (e.g. 2) the output will be more random
            messages: [
              {
                role: 'system',
                content: 'You are a nutrition and health assistant. You generate simple recipes based on the user preferences.', //system gives any instructions to the assistant bot
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