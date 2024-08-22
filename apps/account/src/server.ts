import app from "./app";

const start = async () => {
  try {
    await app.ready();
    await app.listen({
      port: app.config.ACCOUNT_SERVICE_PORT,
      host: "0.0.0.0",
    });
    console.log("server ready");
  } catch (err) {
    app.log.error(err);
    console.error(err);
    process.exit(1);
  }
};

start();
