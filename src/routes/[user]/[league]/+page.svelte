<script>
	import PlayerList from "$lib/components/PlayerList.svelte";
  import Transaction from '$lib/components/Transactions.svelte';
  import { page } from "$app/stores";

  export let data;
  let rosters = data.rosters;
  let player;
  let transactions = [];
  let loading = false;

  $: onChange(player);

  async function onChange(player) {
    if (player) {
      loading = true;
      const res = await fetch(`/api/transactions?player_id=${player.player_id}&league_id=${$page.params.league}`)
      const data = await res.json();
      transactions = data?.transactions.reverse();
      loading = false;
    }
  }
</script>

<div>
  <h1>Player</h1>
  <PlayerList bind:selectedPlayer={player} />
</div>
<div>
  {#if player}
    <h1>Transactions</h1>
    <h3>{player.full_name}</h3>
    {#if loading}
      <div>Loading...</div>
    {:else} 
      {#if transactions.length > 0}
        <div class="transaction-container">
          {#each transactions as transaction}
            <Transaction rosters={rosters} details={transaction} />
          {/each}
        </div>
      {:else}
        <div>No transactions for this player</div>
      {/if}
    {/if}
  {/if}
</div>
  
<style>
  .transaction-container {
    display: flex;
    overflow-x: auto;
  }
</style>