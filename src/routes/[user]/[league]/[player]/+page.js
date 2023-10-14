const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiI4ZTMxZGRmYWI5ZjRjYTFlMzRiNjk3NzhjNDg1YzEwZSIsImRpc3BsYXlfbmFtZSI6ImJvbmV0b3duIiwiZXhwIjoxNjk5OTg0MzU2LCJpc19ib3QiOm51bGwsImlzX21hc3RlciI6bnVsbCwicmVhbF9uYW1lIjpudWxsLCJ1c2VyX2lkIjo0Njk2MzAzODU1NDY4NTAzMDR9.HU307RFlIZwNROjW7em5Pxq7i6N_fT5sBDb6g5Bwtb0'
const fields = ['adds','consenter_ids','created','creator','drops','league_id','leg','metadata','roster_ids','settings','status','status_updated','transaction_id','draft_picks','type','player_map','waiver_budget'];

const mergeUsers = (rosters, users) => {
  return rosters.map(roster => {
    return {
      ...roster,
      ...users.filter(user => user.user_id == roster.owner_id)[0]
    }
  }) 
}

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const { league, player } = params;

	const rosterRes = await fetch(`https://api.sleeper.app/v1/league/${league}/rosters`);
	const rosters = await rosterRes.json();

	const usersRes = await fetch(`https://api.sleeper.app/v1/league/${league}/users`);
	const users = await usersRes.json();

  const rostersAndUsers = mergeUsers(rosters, users)

  const transactionsRes = await fetch('https://sleeper.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify({
      operationName: 'league_transactions_by_player',
      query: `query league_transactions_by_player { league_transactions_by_player(league_id: "${league}", player_id: "${player}") { ${fields.join(' ')} } }`,
      value: ''
    })
  });
  
  const transactionsData = await transactionsRes.json();

	return { rosters: rostersAndUsers, transactions: transactionsData.data.league_transactions_by_player }

//   return { transactions: [
//     {
//         "waiver_budget": null,
//         "type": "waiver",
//         "transaction_id": "1002977932022767616",
//         "status_updated": 1693552058523,
//         "status": "complete",
//         "settings": {
//             "waiver_bid": 0,
//             "seq": 0
//         },
//         "roster_ids": [
//             4
//         ],
//         "player_map": {
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             }
//         },
//         "metadata": {
//             "notes": "Your waiver claim was processed successfully!"
//         },
//         "leg": 1,
//         "league_id": "916895543601926144",
//         "drops": null,
//         "draft_picks": null,
//         "creator": "469630385546850304",
//         "created": 1693491082724,
//         "consenter_ids": [
//             4
//         ],
//         "adds": {
//             "5284": 4
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "waiver",
//         "transaction_id": "1002795354984783872",
//         "status_updated": 1693465641610,
//         "status": "complete",
//         "settings": {
//             "waiver_bid": 0,
//             "seq": 0
//         },
//         "roster_ids": [
//             5
//         ],
//         "player_map": {
//             "5980": {
//                 "news_updated": 1695830144226,
//                 "years_exp": 4,
//                 "injury_status": null,
//                 "team": "MIN",
//                 "first_name": "Myles",
//                 "last_name": "Gaskin",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5980",
//                 "sport": "nfl",
//                 "number": 37,
//                 "status": "Active",
//                 "position": "RB"
//             },
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             }
//         },
//         "metadata": {
//             "notes": "Your waiver claim was processed successfully!"
//         },
//         "leg": 1,
//         "league_id": "916895543601926144",
//         "drops": {
//             "5284": 5
//         },
//         "draft_picks": null,
//         "creator": "689884706661048320",
//         "created": 1693447552966,
//         "consenter_ids": [
//             5
//         ],
//         "adds": {
//             "5980": 5
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "trade",
//         "transaction_id": "902079248892960768",
//         "status_updated": 1669435056716,
//         "status": "complete",
//         "settings": {
//             "expires_at": 1669521361
//         },
//         "roster_ids": [
//             1,
//             5
//         ],
//         "player_map": {
//             "7670": {
//                 "news_updated": 1696205433938,
//                 "years_exp": 2,
//                 "injury_status": null,
//                 "team": "LAC",
//                 "first_name": "Joshua",
//                 "last_name": "Palmer",
//                 "fantasy_positions": [
//                     "WR"
//                 ],
//                 "player_id": "7670",
//                 "sport": "nfl",
//                 "number": 5,
//                 "status": "Active",
//                 "position": "WR"
//             },
//             "7611": {
//                 "news_updated": 1696807204021,
//                 "years_exp": 2,
//                 "injury_status": null,
//                 "team": "NE",
//                 "first_name": "Rhamondre",
//                 "last_name": "Stevenson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "7611",
//                 "sport": "nfl",
//                 "number": 38,
//                 "status": "Active",
//                 "position": "RB"
//             },
//             "5906": {
//                 "news_updated": 1697222756270,
//                 "years_exp": 4,
//                 "injury_status": "Questionable",
//                 "team": "BUF",
//                 "first_name": "Dawson",
//                 "last_name": "Knox",
//                 "fantasy_positions": [
//                     "TE"
//                 ],
//                 "player_id": "5906",
//                 "sport": "nfl",
//                 "number": 88,
//                 "status": "Active",
//                 "position": "TE"
//             },
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             }
//         },
//         "metadata": null,
//         "leg": 12,
//         "league_id": "790836434520121344",
//         "drops": {
//             "7670": 1,
//             "7611": 5,
//             "5906": 1,
//             "5284": 1
//         },
//         "draft_picks": null,
//         "creator": "461963830960844800",
//         "created": 1669434962059,
//         "consenter_ids": [
//             1,
//             5
//         ],
//         "adds": {
//             "7670": 5,
//             "7611": 1,
//             "5906": 5,
//             "5284": 5
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "trade",
//         "transaction_id": "896129641671274496",
//         "status_updated": 1668016663670,
//         "status": "complete",
//         "settings": {
//             "is_counter": 1
//         },
//         "roster_ids": [
//             1,
//             4
//         ],
//         "player_map": {
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             },
//             "4981": {
//                 "news_updated": 1697211955190,
//                 "years_exp": 5,
//                 "injury_status": null,
//                 "team": "JAX",
//                 "first_name": "Calvin",
//                 "last_name": "Ridley",
//                 "fantasy_positions": [
//                     "WR"
//                 ],
//                 "player_id": "4981",
//                 "sport": "nfl",
//                 "number": 0,
//                 "status": "Active",
//                 "position": "WR"
//             }
//         },
//         "metadata": null,
//         "leg": 10,
//         "league_id": "790836434520121344",
//         "drops": {
//             "5284": 4,
//             "4981": 1
//         },
//         "draft_picks": [
//             "1,2023,3,1,4",
//             "10,2023,3,1,4",
//             "12,2023,3,4,1"
//         ],
//         "creator": "461963830960844800",
//         "created": 1668016465159,
//         "consenter_ids": [
//             1,
//             4
//         ],
//         "adds": {
//             "5284": 1,
//             "4981": 4
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "waiver",
//         "transaction_id": "869247214579519488",
//         "status_updated": 1661670353097,
//         "status": "complete",
//         "settings": {
//             "waiver_bid": 0,
//             "seq": 0
//         },
//         "roster_ids": [
//             4
//         ],
//         "player_map": {
//             "830": {
//                 "news_updated": 1675728052154,
//                 "years_exp": 12,
//                 "injury_status": null,
//                 "team": null,
//                 "first_name": "A.J.",
//                 "last_name": "Green",
//                 "fantasy_positions": [
//                     "WR"
//                 ],
//                 "player_id": "830",
//                 "sport": "nfl",
//                 "number": 18,
//                 "status": "Active",
//                 "position": "WR"
//             },
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             }
//         },
//         "metadata": {
//             "notes": "Your waiver claim was processed successfully!"
//         },
//         "leg": 1,
//         "league_id": "790836434520121344",
//         "drops": {
//             "830": 4
//         },
//         "draft_picks": null,
//         "creator": "469630385546850304",
//         "created": 1661607195089,
//         "consenter_ids": [
//             4
//         ],
//         "adds": {
//             "5284": 4
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "waiver",
//         "transaction_id": "868809785078923264",
//         "status_updated": 1661583899748,
//         "status": "complete",
//         "settings": {
//             "waiver_bid": 1,
//             "seq": 0
//         },
//         "roster_ids": [
//             6
//         ],
//         "player_map": {
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             },
//             "4147": {
//                 "news_updated": 1697205054918,
//                 "years_exp": 6,
//                 "injury_status": "Questionable",
//                 "team": "DEN",
//                 "first_name": "Samaje",
//                 "last_name": "Perine",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "4147",
//                 "sport": "nfl",
//                 "number": 25,
//                 "status": "Active",
//                 "position": "RB"
//             }
//         },
//         "metadata": {
//             "notes": "Your waiver claim was processed successfully!"
//         },
//         "leg": 1,
//         "league_id": "790836434520121344",
//         "drops": {
//             "5284": 6
//         },
//         "draft_picks": null,
//         "creator": "475798782873694208",
//         "created": 1661502903769,
//         "consenter_ids": [
//             6
//         ],
//         "adds": {
//             "4147": 6
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "waiver",
//         "transaction_id": "868644536635826176",
//         "status_updated": 1661497489996,
//         "status": "complete",
//         "settings": {
//             "waiver_bid": 0,
//             "seq": 1,
//             "priority": 1
//         },
//         "roster_ids": [
//             6
//         ],
//         "player_map": {
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             }
//         },
//         "metadata": {
//             "notes": "Your waiver claim was processed successfully!"
//         },
//         "leg": 1,
//         "league_id": "790836434520121344",
//         "drops": null,
//         "draft_picks": null,
//         "creator": "475798782873694208",
//         "created": 1661463505470,
//         "consenter_ids": [
//             6
//         ],
//         "adds": {
//             "5284": 6
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "waiver",
//         "transaction_id": "864870104779866112",
//         "status_updated": 1660633505532,
//         "status": "complete",
//         "settings": {
//             "waiver_bid": 0,
//             "seq": 0
//         },
//         "roster_ids": [
//             2
//         ],
//         "player_map": {
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             },
//             "4892": {
//                 "news_updated": 1697208054815,
//                 "years_exp": 5,
//                 "injury_status": null,
//                 "team": "TB",
//                 "first_name": "Baker",
//                 "last_name": "Mayfield",
//                 "fantasy_positions": [
//                     "QB"
//                 ],
//                 "player_id": "4892",
//                 "sport": "nfl",
//                 "number": 6,
//                 "status": "Active",
//                 "position": "QB"
//             }
//         },
//         "metadata": {
//             "notes": "Your waiver claim was processed successfully!"
//         },
//         "leg": 1,
//         "league_id": "790836434520121344",
//         "drops": {
//             "5284": 2
//         },
//         "draft_picks": null,
//         "creator": "658045931349946368",
//         "created": 1660563610790,
//         "consenter_ids": [
//             2
//         ],
//         "adds": {
//             "4892": 2
//         }
//     },
//     {
//         "waiver_budget": null,
//         "type": "draft_pick",
//         "transaction_id": "712704289725743104",
//         "status_updated": 1624284453377,
//         "status": "complete",
//         "settings": null,
//         "roster_ids": [
//             2
//         ],
//         "player_map": {
//             "5284": {
//                 "news_updated": 1697228158737,
//                 "years_exp": 5,
//                 "injury_status": "IR",
//                 "team": "MIA",
//                 "first_name": "Jeff",
//                 "last_name": "Wilson",
//                 "fantasy_positions": [
//                     "RB"
//                 ],
//                 "player_id": "5284",
//                 "sport": "nfl",
//                 "number": 23,
//                 "status": "Inactive",
//                 "position": "RB"
//             }
//         },
//         "metadata": {
//             "years_exp": "3",
//             "teams": "12",
//             "team": "SF",
//             "status": "Inactive",
//             "sport": "nfl",
//             "round_pick_no": "12",
//             "round": "15",
//             "position": "RB",
//             "player_id": "5284",
//             "picked_by": "658045931349946368",
//             "pick_no": "180",
//             "number": "30",
//             "news_updated": "1622047803960",
//             "last_name": "Wilson",
//             "is_keeper": "false",
//             "injury_status": "Out",
//             "first_name": "Jeffery",
//             "draft_id": "688901551015657472"
//         },
//         "leg": 1,
//         "league_id": "688901546771046400",
//         "drops": null,
//         "draft_picks": null,
//         "creator": "658045931349946368",
//         "created": 1624284453377,
//         "consenter_ids": null,
//         "adds": {
//             "5284": 2
//         }
//     }
// ]}

}
