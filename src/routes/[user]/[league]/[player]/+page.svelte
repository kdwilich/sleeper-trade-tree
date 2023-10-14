<script>
  import Transaction from '$lib/components/Transactions.svelte';
  export let data;
  let transactions = data.transactions.reverse();
</script>

<h1>Transactions</h1>

{#if transactions}
  <div class="transaction-container">
    {#each transactions as transaction}
      <Transaction rosters={data.rosters} details={transaction} />
    {/each}
  </div>
{/if}

<style>
  .transaction-container {
    display: flex;
  }
</style>