/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const userRes = await fetch(`https://api.sleeper.app/v1/user/${params.user}`);
	const user = await userRes.json();

	const leagueRes = await fetch(`https://api.sleeper.app/v1/user/${user.user_id}/leagues/nfl/2023`);
	const leagues = await leagueRes.json();

	return { user, leagues }
}
