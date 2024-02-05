import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
 
      dotenv.config();

      const router = express.Router();

      const openai = new OpenAI({ organization: "Personal", apiKey: process.env.OPENAI_API_KEY});

      router.route('/').get((req,res) =>{
            res.send('Hello from DALL-E!');
      });

      router.route('/').post( async(req, res) => {
      try {
            const { prompt } = req.body;
            const aiResponse = await openai.image.create({
                  prompt,
                  n: 1,
                  size: '1024x1024',
                  response_format: 'b64_json',
                });

            const image = aiResponse.data.data[0].b64_json;
            res.status(200).json({ photo:image });
            
      } catch (error) {
            console.log(error);
            res.status(500).send(error?.response.data.error.message);
      }
      });

export default router;




// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from "cors";
// import OpenAI from 'openai';

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({ organization: "your_organization", apiKey: process.env.OPENAI_API_KEY});


// router.route('/').get((req, res) => {
//   res.status(200).json({ message: 'Hello from DALL-E ROUTES' });
// });

// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const response = await openai.image.create({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json',
//     });

//     const image = response.data.data[0].b64_json;
//     console.log('Generated image:', image);

//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }  
// });

// export default router;
