const express = require('express');
const logger = require('morgan'); 
const { engine } = require('express-handlebars');
const liveReload = require('livereload');
const connectLiveReload = require('connect-livereload');
const path = require('path');
const port = 5000;
// require routes   
const userDetailsRouter = require('./resource/routes/userDetailsRouter')
const signinRouter = require('./resource/routes/signinRouter')
// init app with express
const app = express();
// Logger method HTTP in terminal
app.use(logger('tiny'));
// Middleware convert json
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// Static path when use file static
app.use(express.static(path.join(__dirname, 'public')));
// Template engine
const config = {
   extname: '.hbs',
};
app.engine('hbs', engine(config));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));
// Auto refesh the browser on changes
const liveReloadServer = liveReload.createServer();
liveReloadServer.server.once('connection', () => {
   setTimeout(() => {
      liveReloadServer.refresh('/');
   }, 50);
});
app.use(connectLiveReload());
// Middleware router
app.use('/signin', signinRouter);
app.use('/user-detail', userDetailsRouter)
//
app.listen(port, () =>
   console.log('Server is running at https://localhost:5000')
);
