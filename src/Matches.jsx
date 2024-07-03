import React from 'react';
import './Css/Matches.css';

function Matches() {
    return (
        <div className="matches">
            <h2>Matches</h2>
            <div className="filter">
                <div>
                    <label htmlFor="date-from">From</label>
                    <input type="date" id="date-from" />
                </div>
                <div>
                    <label htmlFor="date-to">To</label>
                    <input type="date" id="date-to" />
                </div>
                <div>
                    <label htmlFor="maps">Maps</label>
                    <select id="maps">
                        <option value="">Select Map</option>
                        <option value="map1">Map 1</option>
                        <option value="map2">Map 2</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Map</th>
                        <th>Win?</th>
                        <th>Date</th>
                        <th>Game Length</th>
                        <th>Score</th>
                        <th>Rank</th>
                        <th>Kills</th>
                        <th>Deaths</th>
                        <th>K/D</th>
                        <th>Aim?</th>
                        <th>Utility?</th>
                        <th>Rating?</th>
                        <th>Should have won?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="path-to-your-map-icon.png" alt="Map Icon" /> Anubis</td>
                        <td>Defeat</td>
                        <td>12/03/2024 20:21</td>
                        <td>21:02</td>
                        <td>12:16</td>
                        <td>???</td>
                        <td>8</td>
                        <td>22</td>
                        <td>0.36</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Red team (based on stats)</td>
                    </tr>
                    {/* Flere rækker kan tilføjes her */}
                </tbody>
            </table>
        </div>
    );
}

export default Matches;