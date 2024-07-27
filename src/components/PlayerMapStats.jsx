import React from 'react';
import './../Css/PlayerMapStats.css';
import playerMapStatsData from './../Data/playerMapStats.json';

const PlayerMapStats = ({ currentUser }) => {
    if (!currentUser) {
        return <div>Loading ....</div>;
    }

    const currentUserData = playerMapStatsData.players.find(player => player.playerName == currentUser.username);
    console.log(currentUserData);

    if (!currentUserData) {
        return <div className="NoDataFound">No data available for this user.</div>;
    }

    const { playerName, maps, profilePicture } = currentUserData;
        
    return (
        <div className="playerMapStats">
            <img src={profilePicture} alt="Profile" className="profile-picture-mapStats" />
            <h1>{playerName}'s Map Stats</h1>
            <div className="searchFilters">
            {/*Make your filters here plz */}
                <div className="mapButtonDiv">
                    {/*Make some buttons here for the diffrent maps, so standard you get shown all the maps, 
                        but then you can click like the inferno button and get even deeper stats on that map
                        Cause else you shuld only get some bulletpoint stats, on the front page of the mapstats*/}
                    <button className="mapButtons">All maps</button>
                    <button className="mapButtons">Inferno</button>
                    <button className="mapButtons">Vertigo</button>
                    <button className="mapButtons">Mirage</button>
                    <button className="mapButtons">Anubis</button>
                    <button className="mapButtons">Nuke</button>
                    <button className="mapButtons">Dust2</button>
                    <button className="mapButtons">Ancient</button>
                    <div className="mapStats">
                        {/*Maybe make the buttons not be so close to the bottom of the div*/}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default PlayerMapStats;