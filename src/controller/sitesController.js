const axios = require("axios");
const Site = require("../models/Site");
const validUrl = require("valid-url");

const addSite = async (req, res) => {
  const { url } = req.body;
  if (!validUrl.isUri(url)) {
    return res.status(400).send("URL inválida");
  }

  try {
    const startTime = Date.now();
    const response = await axios.head(url);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(`Tempo de resposta para ${url}: ${responseTime}ms`);
    const { status } = response;

    const site = new Site({
      url,
      availability: status === 200,
      responseTime,
      lastCheckedAt: new Date(),
    });

    await site.save();
    res.status(201).send(site);
  } catch (error) {
    console.error(error);

    if (error.response) {
      res.status(error.response.status).send(error.response.statusText);
    } else {
      res.status(500).send("Falha ao adicionar o site");
    }
  }
};

const getSites = async (req, res) => {
  try {
    const sites = await Site.find().sort("-lastCheckedAt");
    res.send(sites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Falha ao obter os sites");
  }
};

module.exports = {
  addSite,
  getSites,
};
