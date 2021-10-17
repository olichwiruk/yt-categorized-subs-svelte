<script lang="ts">
  import { router } from 'tinro'
  import { user } from './stores/auth'
</script>

<main>
  <h1>Google auth</h1>

  {#if $user}
    <button on:click={() => { user.logout(); router.goto('/') }}>Logout</button>
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

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
