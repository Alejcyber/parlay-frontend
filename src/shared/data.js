import uniqid from 'uniqid';

export const teams = [
    {
      "id": 1,
      "name": "Real Madrid",
      "type": "SOCCER"
    },
    {
      "id": 2,
      "name": "Barcelona",
      "type": "SOCCER"
    },
    {
      "id": 3,
      "name": "Manchester United",
      "type": "SOCCER"
    },
    {
      "id": 4,
      "name": "Liverpool",
      "type": "SOCCER"
    },
    {
      "id": 5,
      "name": "Bayern Munich",
      "type": "SOCCER"
    },
    {
      "id": 6,
      "name": "Golden State Warriors",
      "type": "BASCKET"
    },
    {
      "id": 7,
      "name": "Los Angeles Lakers",
      "type": "BASCKET"
    },
    {
      "id": 8,
      "name": "Boston Celtics",
      "type": "BASCKET"
    },
    {
      "id": 9,
      "name": "Chicago Bulls",
      "type": "BASCKET"
    },
    {
      "id": 10,
      "name": "Milwaukee Bucks",
      "type": "BASCKET"
    },
    {
      "id": 11,
      "name": "New York Yankees",
      "type": "BASEBALL"
    },
    {
      "id": 12,
      "name": "Boston Red Sox",
      "type": "BASEBALL"
    },
    {
      "id": 13,
      "name": "Los Angeles Dodgers",
      "type": "BASEBALL"
    },
    {
      "id": 14,
      "name": "Chicago Cubs",
      "type": "BASEBALL"
    },
    {
      "id": 15,
      "name": "Atlanta Braves",
      "type": "BASEBALL"
    }
  ]


// export const games =  [
//     {
//       "id": 1,
//       "id_team_1": 1,
//       "id_team_2": 2,
//       "date": "2023-08-25T12:00:00Z",
//       "champion_id": null
//     },
//     {
//       "id": 2,
//       "id_team_1": 2,
//       "id_team_2": 3,
//       "date": "2023-08-26T12:00:00Z",
//       "champion_id": null
//     },
//     {
//       "id": 3,
//       "id_team_1": 3,
//       "id_team_2": 4,
//       "date": "2023-08-27T12:00:00Z",
//       "champion_id": null
//     },
//     {
//         "id": 4,
//         "id_team_1": 10,
//         "id_team_2": 9,
//         "date": "2023-08-27T12:00:00Z",
//         "champion_id": null
//     },
//     {
//         "id": 5,
//         "id_team_1": 7,
//         "id_team_2": 8,
//         "date": "2023-08-27T12:00:00Z",
//         "champion_id": null
//     },
//     {
//       "id": 29,
//       "id_team_1": 13,
//       "id_team_2": 14,
//       "date": "2023-09-24T12:00:00Z",
//       "champion_id": null
//     },
//     {
//       "id": 30,
//       "id_team_1": 14,
//       "id_team_2": 15,
//       "date": "2023-09-25T12:00:00Z",
//       "champion_id": null
//     }
//   ]
  

export const generateGames = () => {
  const games = [];

  const now = new Date();
  const sevenDaysLater = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

  let numGames = 0;
  while (numGames < 6) {
    const team1 = teams[Math.floor(Math.random() * teams.length)];
    const team2 = teams[Math.floor(Math.random() * teams.length)];

    if (team1.type !== team2.type) {
      continue;
    }

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
      "type": type
    });
    numGames++;
  }
  localStorage.clear()
  localStorage.setItem('games',JSON.stringify(games));
  return games;
};