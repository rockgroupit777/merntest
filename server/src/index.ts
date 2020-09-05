import { connect } from "mongoose";
import createApp from "./app";
import config from "./config";

const connectApp = async () => {
  try {
    await connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
    const { app, server } = createApp();
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
connectApp();
