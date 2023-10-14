import { players } from "$lib/db/players";

const positions = ['QB', 'RB', 'FB', 'WR', 'TE', 'K']

export async function GET({ url }) {
  const query = url.searchParams.get('query')
  let results = await players.aggregate([
    {
      "$search": {
        "compound": {
          "must": [
            {
              "autocomplete": {
                "query": `${query}`,
                "path": "full_name",
                "fuzzy": {
                  "maxEdits": 1,
                  "prefixLength": 4
                }
              }
            },
            {
              "equals": {
                "path": "active",
                "value": true
              }
            },
            {
              "queryString": {
                "defaultPath": "position",
                "query": positions.join(' OR ')
              }
            }
          ],
        }
      }
    },
    {$limit: 10},
    {$project: {
      "full_name": 1,
      "position": 1,
      "team": 1,
      "player_id": 1,
    }}
  ]).toArray();
  return new Response(JSON.stringify(results))
}