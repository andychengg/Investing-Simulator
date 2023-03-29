const prisma = require("../src/db");

async function getPortfolioById(id) {
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id,
    },
  });
  return portfolio;
} 

async function getPortfoliosByProfile(profileId) {
  const portfolios = await prisma.portfolio.findMany({
    where: {
      fk_profile: profileId,
    },
    include: {
      competition: {
        select: {
          competition_id: true,
        }
      }
    }
  });

  return portfolios;
}

async function addPortfolio(keyValueObj) {
  const newPortfolio = await prisma.portfolio.create({
    data: keyValueObj,
  });

  return newPortfolio;
}

async function getPortfolioBalanceHistory(portfolioId) {
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      id: portfolioId,
    },
    include: {
      history: {
        orderBy: {
          snapshot_time: 'asc'
        }
      },
    },
  });

  return portfolio.history;
}

module.exports = {
  getPortfolioById,
  getPortfoliosByProfile,
  addPortfolio,
  getPortfolioBalanceHistory,
}
