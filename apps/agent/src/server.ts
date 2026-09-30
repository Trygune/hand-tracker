import app from "./app.js";

const start = async () => {
  try {
    await app.listen({
      port: 5000,
      host: "127.0.0.1",
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
