const axios = require("axios");
const Site = require("../models/Site");

async function checkSite(site) {
  try {
    const startTime = Date.now();
    const response = await axios.head(site.url);
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    site.availability = response.status === 200;
    site.responseTime = responseTime;
    site.lastCheckedAt = new Date();
    await site.save();
    console.log(
      `Site ${site.url} verificado em ${site.lastCheckedAt}, disponibilidade: ${site.availability}, tempo de resposta: ${site.responseTime}ms`
    );
  } catch (error) {
    if (error.response && error.response.status) {
      console.error(
        `Falha ao verificar o site ${site.url}: Servidor respondeu com código de status ${error.response.status}`
      );
      site.errorMessage = `Erro ${error.response.status}: Não foi possível verificar o site`;
    } else {
      console.error(`Falha ao verificar o site ${site.url}: ${error.message}`);
      site.errorMessage = "Não foi possível verificar o site";
    }
    site.availability = false;
    site.responseTime = null;
    site.lastCheckedAt = new Date();
    await site.save();
  }
}

async function checkSitesAvailability() {
  try {
    const sites = await Site.find();
    for (const site of sites) {
      await checkSite(site);
    }
  } catch (error) {
    console.error("Falha ao verificar a disponibilidade dos sites:", error);
  }
}

module.exports = { checkSite, checkSitesAvailability };
