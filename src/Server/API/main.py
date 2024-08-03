import uuid

import Analysis
import KasperDummeDatabase
import Repo

from typing import Union

from fastapi import FastAPI, status, HTTPException

app = FastAPI()


@app.post("/test")
def test():
    hej = "hej"
    hejsa = "ejsa"
    response_data = {
        "test": hej,
        "test2": hejsa
    }
    return response_data, status.HTTP_200_OK


@app.post("/get-user_stats_personal/{userid}")
async def get_user_personal_stats(userid: uuid.UUID):
    user_data = KasperDummeDatabase.fetch_player_stats(userid)

    if user_data is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Udtræk nødvendige oplysninger fra brugeroplysningerne
    kills = user_data[2]
    assists = user_data[4]
    deaths = user_data[3]
    headshots = user_data[7]


    # Beregn killavg
    kill_avg = Analysis.player_analysis_mean(kills)
    death_avg = Analysis.player_analysis_mean(deaths)
    assist_avg = Analysis.player_analysis_mean(assists)
    headshot_per = Analysis.player_headshot_per(kills, headshots)


    # Opret svar-objekt med de modtagne data og beregnede data
    response_data = {
        "username": userid,
        "kill_avg": kill_avg,
        "death_avg": death_avg,
        "assist_avg": assist_avg,
        "headshot_per": headshot_per

    }

    # Returner data som JSON
    return response_data, status.HTTP_200_OK


@app.post("/get-user_stats_team/{userid}/{teamid}")
async def get_user_stats(userid: uuid.UUID, teamid: uuid.UUID):
    # Hent brugeroplysninger fra den simulerede database
    user_data = KasperDummeDatabase.fetch_player_team_stats(userid, teamid)

    # Kontroller om brugeren findes i databasen
    if user_data is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Udtræk nødvendige oplysninger fra brugeroplysningerne
    kills = user_data[2]
    assists = user_data[4]
    deaths = user_data[3]
    headshots = user_data[7]


    # Beregn killavg
    kill_avg = Analysis.player_analysis_mean(kills)
    death_avg = Analysis.player_analysis_mean(deaths)
    assist_avg = Analysis.player_analysis_mean(assists)
    headshot_per = Analysis.player_headshot_per(kills, headshots)


    # Opret svar-objekt med de modtagne data og beregnede data
    response_data = {
        "username": userid,
        "teamid": teamid,
        "kill_avg": kill_avg,
        "death_avg": death_avg,
        "assist_avg": assist_avg,
        "headshot_per": headshot_per

    }

    # Returner data som JSON
    return response_data, status.HTTP_200_OK


@app.post("/get-user_single_mapdata/{teamid}/{mapid}")
async def get_user_mapdata(teamid: int, mapid: int):
    # Hent brugeroplysninger fra den simulerede database
    user_data = KasperDummeDatabase.fetch_team_match_stats(KasperDummeDatabase.fetch_match_id(KasperDummeDatabase.fetch_match_id(mapid), teamid), teamid)

    # Kontroller om brugeren findes i databasen
    if user_data is None:
        raise HTTPException(status_code=404, detail="User not found")

    # Udtræk nødvendige oplysninger fra brugeroplysningerne

    total_rounds = user_data["TotalRoundsPlayed"]
    ct_rounds = user_data["CtRoundsPlayed"]
    t_rounds = user_data["TRoundsPlayed"]
    ct_pistol_played = user_data["CtPistolRoundsPlayed"]
    ct_pistol_won = user_data["CtPistolRoundsWins"]
    t_pistol_played = user_data["TPistolRoundsPlayed"]
    t_pistol_won = user_data["TPistolRoundsWins"]

    # Beregn data


    # Opret svar-objekt med de modtagne data og beregnede killavg
    response_data = {
        "teamid": teamid,
        "map": mapid,

    }

    return response_data, status.HTTP_200_OK


