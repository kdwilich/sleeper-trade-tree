<script>
  export let roster_id
  export let rosters

  let { display_name } = rosters.filter(roster => roster_id == roster.roster_id)[0]
</script>

<span>{display_name}</span>