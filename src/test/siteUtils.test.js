const axios = require("axios");
const mongoose = require("mongoose");
const Site = require("../models/Site");
const { checkSite, checkSitesAvailability } = require("../utils/siteUtils");

jest.mock("axios");

beforeAll(async () => {
  const url = "mongodb://127.0.0.1/monitor_de_sites_test";
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await Site.deleteMany({});
});

describe("checkSite", () => {
  it("verifica um site disponível corretamente", async () => {
    axios.head.mockResolvedValue({ status: 200 });

    const site = new Site({ url: "https://exemplo.com" });
    await checkSite(site);

    expect(site.availability).toBe(true);
    expect(site.responseTime).toBeDefined();
    expect(site.lastCheckedAt).toBeInstanceOf(Date);
  });

  it("trata corretamente um site indisponível", async () => {
    axios.head.mockRejectedValue({ response: { status: 404 } });

    const site = new Site({ url: "https://exemplo.com/nonexistent" });
    await checkSite(site);

    expect(site.availability).toBe(false);
    expect(site.responseTime).toBeNull();
    expect(site.lastCheckedAt).toBeInstanceOf(Date);
    expect(site.errorMessage).toMatch(/Erro 404/);
  });
});

describe("checkSitesAvailability", () => {
  it("verifica a disponibilidade de todos os sites", async () => {
    axios.head.mockResolvedValue({ status: 200 });

    const sites = [
      new Site({ url: "https://exemplo1.com" }),
      new Site({ url: "https://exemplo2.com" }),
    ];

    for (const site of sites) {
      await site.save();
    }

    await checkSitesAvailability();

    const updatedSites = await Site.find();
    expect(updatedSites).toHaveLength(2);
    updatedSites.forEach((site) => {
      expect(site.availability).toBe(true);
      expect(site.responseTime).toBeDefined();
      expect(site.lastCheckedAt).toBeInstanceOf(Date);
    });
  });
});
