const expressStarter = require('express-starter');
const bodyParser = require('body-parser');

expressStarter.start(3002,
  (express, app, io) => {
    app.use(bodyParser.raw({
      limit: '10mb',
      type: 'image/jpeg'
    }))
    app.use((req, res, next) => {
      console.log(`Request @ ${req.originalUrl}`);
      next();
    });
  },
  (express, app, io) => {
    // postload
    // could catch unhandled requests here
    app.use((req, res, next) => {
      if(res.responsePromise instanceof Promise) {
        res.responsePromise
          .then((response) => res.send(response))
          .catch((error) => res.status(500).send(error));
      } else {
        next();
      }
    })
  }
);
