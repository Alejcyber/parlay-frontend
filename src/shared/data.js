import uniqid from 'uniqid';

export const teams = [
  {
    "id": 1,
    "name": "Real Madrid",
    "type": "SOCCER⚽"
  },
  {
    "id": 2,
    "name": "Barcelona",
    "type": "SOCCER⚽"
  },
  {
    "id": 3,
    "name": "Manchester United",
    "type": "SOCCER⚽"
  },
  {
    "id": 4,
    "name": "Liverpool",
    "type": "SOCCER⚽"
  },
  {
    "id": 5,
    "name": "Bayern Munich",
    "type": "SOCCER⚽"
  },
  {
    "id": 6,
    "name": "Golden State Warriors",
    "type": "BASCKET🏀"
  },
  {
    "id": 7,
    "name": "Los Angeles Lakers",
    "type": "BASCKET🏀"
  },
  {
    "id": 8,
    "name": "Boston Celtics",
    "type": "BASCKET🏀"
  },
  {
    "id": 9,
    "name": "Chicago Bulls",
    "type": "BASCKET🏀"
  },
  {
    "id": 10,
    "name": "Milwaukee Bucks",
    "type": "BASCKET🏀"
  },
  {
    "id": 11,
    "name": "New York Yankees",
    "type": "BASEBALL⚾"
  },
  {
    "id": 12,
    "name": "Boston Red Sox",
    "type": "BASEBALL⚾"
  },
  {
    "id": 13,
    "name": "Los Angeles Dodgers",
    "type": "BASEBALL⚾"
  },
  {
    "id": 14,
    "name": "Chicago Cubs",
    "type": "BASEBALL⚾"
  },
  {
    "id": 15,
    "name": "Atlanta Braves",
    "type": "BASEBALL⚾"
  }
]

export const leagues = [
  {
      "id": 1,
      "name": "Major League Baseball",
      "type": "BASEBALL⚾",
  },
  {
      "id": 2,
      "name": "National League",
      "type": "BASEBALL⚾",
  },
  {
      "id": 3,
      "name": "American League",
      "type": "BASEBALL⚾",
  },
  {
      "id": 4,
      "name": "National Basketball Association",
      "type": "BASCKET🏀",
  },
  {
      "id": 5,
      "name": "East Coast Basketball League",
      "type": "BASCKET🏀",
  },
  {
      "id": 6,
      "name": "Maximum Basketball League",
      "type": "BASCKET🏀",
  },
  {
      "id": 7,
      "name": "Premier League",
      "type": "SOCCER⚽",
  },
  {
      "id": 8,
      "name": "La Liga",
      "type": "SOCCER⚽",
  },
  {
      "id": 9,
      "name": "Serie A",
      "type": "SOCCER⚽",
  },
]

export const generateLeague = (type) => {
  const leaguesBySport = leagues.filter(league => league.type === type)
  return leaguesBySport[Math.floor(Math.random() * leaguesBySport.length)]
};

export const generateWinner = (teams) => {
  return teams[Math.floor(Math.random() * teams.length)]
}

export const generateGame = (gameType) => {
  const games = [];

  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

  let numGames = 0;
  while (numGames < 2) {
    const teamsType = teams.filter(team => team.type === gameType)
    const team1 = teamsType[Math.floor(Math.random() * teamsType.length)];
    const team2 = teamsType[Math.floor(Math.random() * teamsType.length)];

    if (team1 === team2) {
      continue;
    }
    const randomHour = Math.floor(Math.random() * 24);
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + numGames, randomHour);
    if (date > sevenDaysLater) {
      continue;
    }

    const type = team1.type;

    games.push({
      "id": uniqid(),
      "team_1": team1,
      "team_2": team2,
      "date": date.toISOString(),
      "type": type,
      "league": generateLeague(type),
      "winner": generateWinner([team1, team2, {id: 0, name: "Empate"}])
    });
    numGames++;
  }
  localStorage.clear()
  localStorage.setItem('games',JSON.stringify(games));
  return games;
};

export const generateGames = () => {
  let games = [];

  games = games.concat(generateGame("BASEBALL⚾"))
  games = games.concat(generateGame("SOCCER⚽"))
  games = games.concat(generateGame("BASCKET🏀"))

  localStorage.clear()
  localStorage.setItem('games',JSON.stringify(games));
  return games;
};