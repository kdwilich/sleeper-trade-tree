<script>
	import { page } from '$app/stores';

	/** @type {import('./$types').PageData} */
  export let data;
  const { user, leagues } = data;
</script>
{user.username}

{#each leagues as league}
  <ul>
    <li><a href={`${$page.url.pathname}/${league.league_id}`}>{league.name}</a></li>
  </ul>
{/each}