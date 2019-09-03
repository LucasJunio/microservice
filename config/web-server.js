let PORT = 80;

if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "homolog"
) {
  PORT = 4000;
}

module.exports = {
  port: PORT
};
