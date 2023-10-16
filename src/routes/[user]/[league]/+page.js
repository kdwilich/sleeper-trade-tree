
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
  const { league } = params;
  
	const rosterRes = await fetch(`https://api.sleeper.app/v1/league/${league}/rosters`);
	const rosters = await rosterRes.json();

	const usersRes = await fetch(`https://api.sleeper.app/v1/league/${league}/users`);
	const users = await usersRes.json();

  const rostersAndUsers = mergeUsers(rosters, users)
	return { rosters: rostersAndUsers }
}
