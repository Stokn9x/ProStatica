import ProfilPic from './../assets/Placeholder.jpg';
import './../Css/PlayerCard.css';

function PlayerCard({ player }) {
    return (
        <div className="playerCard">
            <div className="img-container">
                <img className="Card-img" src={player.profilePic} alt="profile picture"></img>
            </div>
            <h2>{player.username}</h2>
            <p>kd: {player.kd}</p>
            <p>kast: {player.kast}</p>
            <p>rating: {player.rating}</p>
        </div>
    );
}

export default PlayerCard;