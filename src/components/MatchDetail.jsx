import React from 'react';
import { useParams } from 'react-router-dom';

function MatchDetail() {
    const { id } = useParams();

    // Fetch match details based on the id
    // Her kan du hente data om kampen fra din backend eller en statisk liste

    return (
        <div>
            <h2>Match Details for ID: {id}</h2>
            {/* Vis matchdetaljer her */}
        </div>
    );
}

export default MatchDetail;
