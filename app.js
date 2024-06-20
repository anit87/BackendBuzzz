
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
//const otpRoutes = require('');

require('dotenv').config();


// Your route handler
app.use(cors());
const userRoutes = require('./src/User/Routes/RegisterUserRoutes');
const CommonApiRoutes=require('./src/User/Routes/CommonApiRounter');
const ProfilePostRoutes=require('./src/User/Routes/ProfilePostRouter');
const PostLikeRoutes= require ('./src/User/Routes/PostLikeRouter');
const PostCommentRoutes = require ('./src/User/Routes/PostCommentRouter');
const BarRouter = require ('./src/User/Routes/BarRouter');
const CheckInRouter = require('./src/User/Routes/CheckInRouter');
const otpRoutes = require ('../BackendBuzzz/src/User/Routes/OTPRouter')
app.use(express.json());
app.use('/users', userRoutes);
app.use('/CommonApi',CommonApiRoutes);
app.use('/ProfilePost',ProfilePostRoutes);
app.use('/PostLike',PostLikeRoutes);
app.use('/PostComment',PostCommentRoutes);
app.use('/Bar',BarRouter);
app.use('/CheckIn',CheckInRouter);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Routes
//const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/otp', otpRoutes);


app.listen(process.env.PORT||4006, () => {
  console.log('Server is running on port 4006');
});
