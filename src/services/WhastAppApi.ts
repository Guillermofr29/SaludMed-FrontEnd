import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const client = twilio(accountSid, authToken);

app.post('/whatsapp', (req: Request, res: Response) => {
  const message = req.body.message;

  client.messages
    .create({
      body: message,
      from: 'whatsapp:+529981969840',
      to: 'whatsapp:+19136007483',
    })
    .then((message: any) => console.log(message.sid))
    .catch((error: Error) => console.error(error));

  res.send('Message sent');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
