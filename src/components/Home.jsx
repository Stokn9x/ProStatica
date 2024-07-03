import React from 'react';
import './../Css/Home.css';

function Home() {
    return (
        <div className="HomePage">
            <div className="stats-header">
                <div className="stat-item">Winrate</div>
                <div className="stat-item">KDA</div>
                <div className="stat-item">Avg Kills</div>
                <div className="stat-item">Kr</div>
            </div>
            <div className="homePageMatches-header">
                <h3>Last 5 Matches</h3>
            </div>
            <div className="homePageMatches">
                {/*{recentMatches.map((match, index) => (
          <MatchCard key={index} match={match} />
        ))}*/}
            </div>
        </div>
    );
}

export default Home;