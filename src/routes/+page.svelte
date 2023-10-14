<script>
  import { goto } from '$app/navigation';

  export let user = 'bonetown';

  const handleClick = () => {
    if (user) {
      goto('/' + user);
    } else {
      console.error('User not specified');
    }
  }

</script>

<h1>Hello and welcome to my site!</h1>

<form on:submit|preventDefault={handleClick}>

  User: <input type="text" bind:value={user}>

  <button type="submit">Go</button>

</form>
