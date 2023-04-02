const { profile } = require("console");
const prisma = require("../src/db");



// returns a list of all competitions in db
async function getCompetitions() {
    return await prisma.competition.findMany();
}

async function getPersonalCompetitions(profileId) {
    return await prisma.portfolio.findMany({
        where: {
            fk_profile: profileId,
            portfolio_type: 'competition'
        },
        include: {
            competition: true,
        }
    });
}

// returns the list of participants in a competition (not sorted)
async function getCompetitionParticipants(competitionId) {
    const res = await prisma.portfolio.findMany({
        where: {
            fk_competition: competitionId
        },
        include: {
            profile: {
                select: {
                    first_name: true,
                    last_name: true,
                    email: true
                }
            }
        }
    });    
    return res;
}

// get competition info
async function getCompetitionInfo(competitionId) {
    return await prisma.competition.findFirst({
        where: {
            competition_id: competitionId
        },
    });
}

async function createCompetition(balance, startDate, endDate, entryPoints = -1, numPlayers = -1, name) {
   
    return await prisma.competition.create({
        data: {
            max_num_players: numPlayers,
            entry_points: entryPoints,
            start_balance: balance,
            start_time: startDate,
            end_time: endDate,
            name: name,
        }
    });
}

async function updateCompetition(competitionId, startDate, endDate, playerSize) {
    return await prisma.competition.update({
        where: { competition_id: competitionId },
        data: {
          start_time: startDate,
          end_time: endDate,
          max_num_players: playerSize
        }
      });
      
}

module.exports = {
    getCompetitionInfo,
    getCompetitions,
    getPersonalCompetitions,
    getCompetitionParticipants,
    createCompetition,
    updateCompetition,
};
