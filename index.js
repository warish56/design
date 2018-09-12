const StartUp = require("./startup/Start");

StartUp.applyMiddelware();
StartUp.listenToDifferentRoutes();
StartUp.connectToMongoDb();
StartUp.startListeningToRoutes();
