<script lang="ts">
  import { router } from 'tinro'
  import { user } from './stores/auth'
  import Main from './Main.svelte'
</script>

<main>
  {#if $user}
    <button on:click={() => { user.logout(); router.goto('/') }}>Logout</button>
    <Main />
  {:else}
    <button on:click={() => user.signin()}>Sign In</button>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
