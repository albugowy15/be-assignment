import app from "./app";

const start = async () => {
  try {
    await app.ready();
    await app.listen({ port: app.config.APP_PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
