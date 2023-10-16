const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXIiOiI4ZTMxZGRmYWI5ZjRjYTFlMzRiNjk3NzhjNDg1YzEwZSIsImRpc3BsYXlfbmFtZSI6ImJvbmV0b3duIiwiZXhwIjoxNjk5OTg0MzU2LCJpc19ib3QiOm51bGwsImlzX21hc3RlciI6bnVsbCwicmVhbF9uYW1lIjpudWxsLCJ1c2VyX2lkIjo0Njk2MzAzODU1NDY4NTAzMDR9.HU307RFlIZwNROjW7em5Pxq7i6N_fT5sBDb6g5Bwtb0'
const fields = ['adds','consenter_ids','created','creator','drops','league_id','leg','metadata','roster_ids','settings','status','status_updated','transaction_id','draft_picks','type','player_map','waiver_budget'];

export async function GET({ url }) {
  const playerId = url.searchParams.get('player_id');
  const leagueId = url.searchParams.get('league_id');

  const transactionsRes = await fetch('https://sleeper.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify({
      operationName: 'league_transactions_by_player',
      query: `query league_transactions_by_player { league_transactions_by_player(league_id: "${leagueId}", player_id: "${playerId}") { ${fields.join(' ')} } }`,
      value: ''
    })
  });
  
  const transactionsData = await transactionsRes.json();

  const results = { transactions: transactionsData.data.league_transactions_by_player }

  return new Response(JSON.stringify(results))
}