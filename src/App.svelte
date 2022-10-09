<script lang="ts">
  import { router } from 'tinro'
  import { session, accessToken } from './stores/auth'
  import Main from './Main.svelte'
</script>

<main>
  {#if $accessToken}
    <Main />
  {:else}
    <button on:click={() => session.authorize()}>Authorize</button>
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
