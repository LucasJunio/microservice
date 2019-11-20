let PORT = 8080;

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "homolog") {
  PORT = 4020;
}

module.exports = {
  port: PORT
};
