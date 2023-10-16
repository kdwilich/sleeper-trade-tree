<script>
  let query = 'jeff wilson'
  let players = []
  let timeout
  export let selectedPlayer;

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

<input bind:value={query} on:input={handleInput}>
<button on:click={handleInput}>Go</button>

<ul>
  {#each players as player}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li on:click={() => selectedPlayer = player}>{player.full_name}</li>
  {/each}
</ul>