const StartUp = require("./startup/Start");

StartUp.checkEnvironMentVariables();
StartUp.applyMiddelware();
StartUp.listenToDifferentRoutes();
StartUp.connectToMongoDb();
StartUp.startListeningToPort();
