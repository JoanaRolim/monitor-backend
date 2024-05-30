const express = require("express");
const sitesRouter = require("./routes/sites");
const { checkSitesAvailability } = require("./utils/siteUtils");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const app = express();

app.use(express.json());
app.use(helmet());

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

connectDB();

app.use("/sites", sitesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  setInterval(checkSitesAvailability, 60000);
});
