const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middlewares/ErrorHandler');
const connectDB = require('./dbconfig/config');
const cors = require('cors');
const port = process.env.PORT || 5000;
const clientAddress = process.env.CLIENT_ADDRESS

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: clientAddress
    }
});

app.use(cors({
    origin: clientAddress
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);


//For Http Requests//
app.use('/carts', require('./routes/CartRoutes'))
app.use('/products', require('./routes/ProductRoutes'))
app.use('/inventory', require('./routes/InventoryRoutes'))
app.use('/orders', require('./routes/OrderRoutes'))
app.use('/users', require('./routes/UserRoutes'))



server.listen(port, () => console.log(`Running on port ${port}`));