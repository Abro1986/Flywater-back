require('dotenv').config();
//app.use(express.bodyParser());
let bodyParser = require('body-parser')

let express = require('express');
let app = express();
var cors = require('cors');
app.use(cors());
const router = express.Router();
let projectRouter = require('./config/routes.js')

app.use(bodyParser.json());



// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'AndrewBroestl@gmail.com',
  from: 'AndrewBroestl@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
//sgMail.send(msg);

app.post('/api/mail', function(req,res) {


	console.log("hitting the mail post route")

	let msgTwo = {
  to: req.body.email,
  from: 'AndrewBroestl@gmail.com',
  subject: 'New email!',
  text: req.body.content,
  html: `<strong>${req.body.content}</strong>`,
};

	sgMail.send(msgTwo);
console.log(req.body.content)
	res.sendStatus(200)
})

app.get('/api/all', function(req, res) {
	res.send('hello')
})

let port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log(`listening on port ${ port }`);
});