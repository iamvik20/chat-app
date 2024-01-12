const express = require('express');
const cors = require('cors');
const { mongoConnect } = require('./services/mongo');
const  userRoutes  = require('./routes/userRoutes');
const messagesRoute = require("./routes/messagesRoute");

const app = express();
require('dotenv').config();



app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes)
app.use("/api/message", messagesRoute);


app.get('/', (req, res) => {
    res.send('Hello we are going to build Chat App. So excited.');
})


async function startServer () {
    await mongoConnect();

    app.listen(process.env.PORT, () => {
        console.log('App is listening to port:', process.env.PORT);
    });
}

startServer();