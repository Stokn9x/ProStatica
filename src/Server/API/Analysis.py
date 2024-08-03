

def player_analysis_mean(stats):

    stats_sum = sum(stats)

    avg_stats = stats_sum / len(stats)

    return avg_stats


def player_analysis_mean2(stat, total):

    return total / stat


def map_sorter(maps_played):
    maps = {
        "Mirage": 0,
        "Vertigo": 0,
        "Ancient": 0,
        "Overpass": 0,
        "Nuke": 0,
        "Inferno": 0,
        "Anubis": 0
    }

    for map in maps_played:
        if map == 0:
            maps["Mirage"] += 1
        elif map == 1:
            maps["Vertigo"] += 1
        elif map == 2:
            maps["Ancient"] += 1
        elif map == 3:
            maps["Overpass"] += 1
        elif map == 4:
            maps["Nuke"] += 1
        elif map == 5:
            maps["Inferno"] += 1
        elif map == 6:
            maps["Anubis"] += 1

    return maps


def map_analysis_frequency_percentage(map_frequency):

    if not isinstance(map_frequency, dict):
        raise TypeError("Input 'frequency' must be a dictionary.")

    categories = ['Mirage', 'Vertigo', 'Ancient', 'Overpass', 'Nuke', 'Inferno', 'Anubis']
    for key in categories:
        map_frequency.setdefault(key, 0)

    frequency_sum = sum(map_frequency.values())

    if frequency_sum == 0:
        raise ValueError("Sum of frequencies is zero.")

    map_frequency_per = []
    for key in categories:
        x = (map_frequency[key] / frequency_sum) * 100
        map_frequency_per.append(x)

    return map_frequency_per

def player_analysis_frequency(stats):

    frequency = {
        "0-5": 0,
        "5-10": 0,
        "10-15": 0,
        "15-20": 0,
        "20-25": 0,
        "25-30":0,
        "30+":0
    }

    for stat in stats:
        if stat >= 30:
            frequency["30+"] += 1
        elif stat >= 25:
            frequency["25-30"] += 1
        elif stat >= 20:
            frequency["20-25"] += 1
        elif stat >= 15:
            frequency["15-20"] += 1
        elif stat >= 10:
            frequency["10-15"] += 1
        elif stat >= 5:
            frequency["5-10"] += 1
        else:
            frequency["0-5"] += 1

    return frequency


def player_analysis_frequency_percentage(frequency):

    if not isinstance(frequency, dict):
        raise TypeError("Input 'frequency' must be a dictionary.")

    categories = ['30+', '25-30', '20-25', '15-20', '10-15', '5-10', '0-5']
    for key in categories:
        frequency.setdefault(key, 0)

    frequency_sum = sum(frequency.values())

    if frequency_sum == 0:
        raise ValueError("Sum of frequencies is zero.")

    frequency_per = []
    for key in categories:
        x = (frequency[key] / frequency_sum) * 100
        frequency_per.append(x)

    return frequency_per


def player_match_win_per(wins, loss):
    total_matches = wins + loss

    win_per = total_matches / wins * 100

    return win_per


def player_headshot_per(kills, headshots):
    headshot_per = kills / headshots * 100

    return headshot_per





