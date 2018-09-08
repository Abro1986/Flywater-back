require('dotenv').config();
let bodyParser = require('body-parser')
let express    = require('express');
let app        = express();
let cors       = require('cors');
let router     = express.Router();

app.use(cors());
app.use(bodyParser.json());



// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);


app.post('/api/mail', function(req,res) {


	console.log("hitting the mail post route")

	let msgTwo = {
  to: 'AndrewBroestl@gmail.com',
  from: req.body.email,
  subject: 'New email!',
  text: req.body.content,
  html: `<strong>${req.body.content}</strong>`,
};

	sgMail.send(msgTwo);
	res.sendStatus(200)
})

app.get('/api/all', function(req, res) {
	res.send('hello')
})

let port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log(`listening on port ${ port }`);
});