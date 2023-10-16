<script>
	import Player from './Player.svelte';
	import Roster from './Roster.svelte';

	export let details;
  export let rosters;

	let {
		type,
		metadata,
		settings,
		adds,
		drops,
		player_map,
		status_updated,
		draft_picks,
		waiver_budget,
    roster_ids
	} = details;

	const getDate = (unix) => new Date(unix).toLocaleDateString();
	const translateDraftPick = (pick) => {
		const [roster_id, year, round, dropped_by, added_by] = pick.split(',');
		return { roster_id, year, round, dropped_by, added_by }
	}

	if (draft_picks) {
		draft_picks = draft_picks.map(pick => translateDraftPick(pick));
	}
</script>

<div class="transaction">
	<div>{getDate(status_updated)}</div>
	<div>{type}</div>
	{#if type === 'draft_pick'}
		<ul>
			<li>{metadata.round}.{metadata.round_pick_no}</li>
		</ul>
	{:else if type === 'trade'}
    {#each roster_ids as roster_id}
      <Roster {roster_id} {rosters} />
      <ul class="trade-list">
        {#each Object.entries(adds) as [player_id, added_by_id]}
          {#if added_by_id === roster_id}
            <li><Player {player_id}/></li>
          {/if}
        {/each}
				{#if draft_picks}
					{#each draft_picks as draft_pick}
						{#if roster_id == draft_pick.added_by}
							<li>{draft_pick.year} {draft_pick.round} Rd (<Roster roster_id={draft_pick.roster_id} {rosters} />)</li>
						{/if}
					{/each}
				{/if}
      </ul>
    {/each}
	{:else if type === 'waiver'}
		{#if adds}
			<ul class="add-list">
				{#each Object.keys(adds) as player_id}
					<li><Player {player_id} /> (${settings.waiver_bid})</li>
				{/each}
			</ul>
		{/if}
		{#if drops}
			<ul class="drop-list">
				{#each Object.keys(drops) as player_id}
					<li><Player {player_id} /></li>
				{/each}
			</ul>
		{/if}
	{:else}
		<h5>Type unknown</h5>
	{/if}
</div>

<style>
	h5 {
		margin: 0.25rem 0;
	}
	.transaction {
		margin: 1rem;
		padding: 0.25rem;
		border: 1px solid teal;
		min-width: 150px;
    flex: 1 0 auto;
	}
	ul {
		padding-left: 20px;
    text-indent: 4px;
	}
  .trade-list,
	.add-list {
    list-style-type: "+";
  }
	.drop-list {
    list-style-type: "-";
	}
</style>
