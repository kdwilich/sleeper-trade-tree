import { players } from "$lib/db/players";

export async function GET({ url }) {
  const player_id = url.searchParams.get('player_id')
  let results = await players.aggregate([
    {
      "$search": {
        "index": "player_id",
        "text": {
          "path": "player_id",
          "query": `${player_id}`
        }
      }
    },
    {$limit: 1},
    {$project: {
      "full_name": 1,
      "position": 1,
      "team": 1,
      "player_id": 1,
    }}
  ]).toArray();
  return new Response(JSON.stringify(results[0]))
}