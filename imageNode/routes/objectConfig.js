const Path = require("path");

exports.config = {
  routes: {
    put: {
      '/img': (req, res, next) => {
        console.log(req.body)
        // res.send("OK!")
        res.responsePromise = new Promise((resolve, reject) => {
          // this is where you'd write your processing logic, and call resolve with the result
          setTimeout(() => {
            console.log('Finished processing')
            resolve("Finished processing!")
          }, 1000)
        })
        
        next()
      }
    }
  },
  socketEvents: {
    connection() {
      console.log("got a connection from object config!");
    },
    hello(io, socket, msg) {
      socket.emit("hello", "hello from an object config!");
    },
    disconnect() {
      console.log("got a disconnection from object config!");
    }
  }
};
