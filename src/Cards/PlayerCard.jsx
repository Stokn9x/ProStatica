import ProfilPic from './../assets/Placeholder.jpg'
import './../Css/PlayerCard.css';

function PlayerCard(props) {
    return (
        <div className="playerCard">
            <img className="Card-img" src={ProfilPic} alt="profile picture"></img>
            <h2>{props.name}</h2>
            <p>kd: {props.kd} </p>
            <p>kast: {props.kast}</p>
            <p>rating: {props.rating}</p>

        </div>
    );
}

export default PlayerCard