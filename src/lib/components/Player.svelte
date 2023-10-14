<script>
	import { onMount } from "svelte";


  export let player_id
  let player

  async function searchPlayers() {
    if (player_id) {
      const res = await fetch(`/api/player?player_id=${player_id}`)
      player = await res.json();
    }
  }

  onMount(searchPlayers)

</script>

{#if player}
  <span>{player.full_name}</span>
{/if}