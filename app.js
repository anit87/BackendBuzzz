
const express = require('express');
const app = express();
const cors = require("cors");
// Your route handler
app.use(cors());
const userRoutes = require('../Buzzzz/src/User/Routes/RegisterUserRoutes');
const CommonApiRoutes=require('../Buzzzz/src/User/Routes/CommonApiRounter');
const ProfilePostRoutes=require('../Buzzzz/src/User/Routes/ProfilePostRouter');
const PostLikeRoutes= require ('../Buzzzz/src/User/Routes/PostLikeRouter');
const PostCommentRoutes = require ('../Buzzzz/src/User/Routes/PostCommentRouter');
const BarRouter = require ('../Buzzzz/src/User/Routes/BarRouter');
const CheckInRouter = require('../Buzzzz/src/User/Routes/CheckInRouter');
app.use(express.json());
app.use('/users', userRoutes);
app.use('/CommonApi',CommonApiRoutes);
app.use('/ProfilePost',ProfilePostRoutes);
app.use('/PostLike',PostLikeRoutes);
app.use('/PostComment',PostCommentRoutes);
app.use('/Bar',BarRouter);
app.use('/CheckIn',CheckInRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
