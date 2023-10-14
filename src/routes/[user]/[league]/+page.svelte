<script>
	import { page } from '$app/stores';

  let query = 'jeff wilson'
  let players = []
  let timeout

  async function handleInput() {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(searchPlayers, 300)
  }

  async function searchPlayers() {
    if (query) {
      const res = await fetch(`/api/players?query=${query}`)
      players = await res.json();
    }
  }

</script>

<h1>Player</h1>

<input bind:value={query} on:input={handleInput}>
<button on:click={handleInput}>Go</button>

<ul>
  {#each players as player}
    <li><a href={`${$page.url.pathname}/${player.player_id}`}>{player.full_name}</a></li>
  {/each}
</ul>