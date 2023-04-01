var express = require('express');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

var router = express.Router();
router.use(cookieParser());

const portfolioDbService = require('../services/Portfolio');
const competitionDbService = require('../services/Competition');

// when the user searches for competitions show the list of competitions
// router.get('/all', async (req, res, next) => {
//     try {

//         let competitions = await competitionDbService.getCompetitions();

//         res.json({ 
//             competitions: competitions.map(x => {
//                 return {
//                     uuid: x.competition_id,
//                     competitionStart: x.start_time,
//                     competitionEnd: x.end_time,
//                 };
//             }) 
//         });

//     } catch (err) {
//         res.status(404).json(err);
//     }
// });

// when the user clicks on Competition in navbar show the list of personal competitions
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
  });
router.get('/competitions', async (req, res, next) => {
    try {
        
        // get profile id from cookie
        var profileId = req.body.profileId;

        let competitions = await competitionDbService.getPersonalCompetitions(profileId);
        res.json({ competitions: competitions });

    } catch (err) {
        res.status(404).json(err);
    }
});


// when the user clicks on any competition show the info
router.get('/:competitionId', async (req, res, next) => {
    try {
        
        var competitionId = req.params.competitionId;

        var members = await competitionDbService.getCompetitionParticipants(competitionId);
        var comp = await competitionDbService.getCompetitionInfo(competitionId);

        res.json({
            requirements: {
                maxParticipants: comp.max_num_players,
                entryPoints: comp.entry_points
            },
            competitionStart: comp.start_time,
            competitionEnd: comp.end_time,
            startingBalance: comp.start_balance,
            rankings: members.map(x => {
                return {
                    id: x.portfolio_id,
                    balance: x.base_balance,
                    profits: x.investment_profit,
                }
            }).sort((a, b) => {
                let r1 = a.profits + a.balance;
                let r2 = b.profits + b.balance;
                return r1 - r2;
            })
        });

    } catch (err) {
        res.status(404).json(err);
    }
});


// when the user clicks on Competition in navbar show the list of personal competitions
router.get('/join/:competitionId', async (req, res, next) => {
    try {
        
        // get profile id from cookie
        var profileId = req.body.profileId;
        
        var competitionId = req.params.competitionId;

        var members = await competitionDbService.getCompetitionParticipants(competitionId);
        var comp = await competitionDbService.getCompetitionInfo(competitionId);
        if (comp.max_num_players === members.length) {
            res.status(403).json('competition is maxed out!');
            return;
        }

        let result = await portfolioDbService
            .createCompetitionPortfolio(profileId, competitionId, comp.start_balance);

        res.sendStatus(201);

    } catch (err) {
        res.status(404).json(err);
    }
});


// create competition
router.post('/create', async (req, res, next) => {
    try {
        // get profile id from cookie
        var profileId = req.body.profileId;
        var requirements = req.body.requirements;
        const { start_balance, start_time, end_time, entry_points, max_num_players, name } = req.body;
        console.log(start_balance)
        console.log(start_time);
        console.log(end_time);
        console.log(entry_points);
        console.log(max_num_players);
        console.log(name);

        let comp = await competitionDbService.createCompetition(start_balance, start_time, end_time, entry_points, max_num_players, name);

        let result = await portfolioDbService
            .createCompetitionPortfolio(profileId, comp.competition_id, comp.start_balance);

        res.status(201).json({
            competitionId: comp.competition_id
        });


    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});


module.exports = router;
