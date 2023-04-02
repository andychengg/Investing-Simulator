import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import CompetitionSidebar from 'components/Competition/CompetitionSidebar';
import CompetitionStandings from 'components/Competition/CompetitionStandings';
import CompetitionGraph from 'components/Competition/CompetitionGraph';
import CompetitionInvite from 'components/Competition/CompetitonInvite';
import CompetitionConfiguration from './CompetitionConfig';
import { getCompetitionData } from 'api/Competition/Competition';
import { Participant } from './sharedTypes/ParticipantInterface';

import './style.scss';
import Button from 'components/PrimeReact/Button/Button';
import Card from 'components/PrimeReact/Card/Card';
import Toolbar from 'components/PrimeReact/Toolbar/Toolbar';


function Competition({ ...props }) {
    const [searchParams] = useSearchParams();

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [competitionName, setCompetitionName] = useState("");
    const [competitionData, setCompetitionData] = useState<any>(null);
    const [competitionId, setCompetitionId] = useState<string>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [config, setConfig] = useState({
        startDate: new Date(),
        endDate: new Date(),
        playerSize: 0,
    });

    // fetch information about competition
    useEffect(() => {
        async function fetchData() {
            // get competition id from query string in URL
            const id = searchParams.get("id");
            const data = await getCompetitionData(id);
            setCompetitionData(data);
            setCompetitionId(id);

            setCompetitionName(data.competitionName);
            setParticipants(data.rankings);
            setConfig({
                startDate: new Date(data.competitionStart),
                endDate: new Date(data.competitionEnd),
                playerSize: data.requirements.maxParticipants,
            });
        }

        fetchData();
    }, [refresh]);

    const leftToolbarContents = (
        <>
            <div className="mr-5 font-bold text-gray-700">Start Date: {config.startDate.toDateString()}</div>
            <div className="mr-5 font-bold text-gray-700">End Date: {config.endDate.toDateString()}</div>
            <div className="font-bold text-gray-700">Player Size: {config.playerSize}</div>
        </>
    );
    
    const rightToolbarContents = (
        <>
            <Button className="mr-2" label="Start Competition" icon="pi pi-arrow-circle-right" iconPos="right"/>
            <CompetitionInvite competitionName competitionId={searchParams.get("id")} />
            <div className='mr-2'></div>
            <CompetitionConfiguration competition={competitionData} competitionId={competitionId} refresh={() => setRefresh(!refresh)}  />
        </>
    );

    return (
        <Card className="competition-card mx-4">
            <div className="text-5xl font-bold text-gray-700 text-center">
                {competitionName}
            </div>

            <Toolbar className="my-3 bg-gray-300" left={leftToolbarContents} right={rightToolbarContents} />

            <CompetitionSidebar />
            <CompetitionGraph />
            <CompetitionStandings participants={participants}/>
        </Card>
    );
}

export default Competition