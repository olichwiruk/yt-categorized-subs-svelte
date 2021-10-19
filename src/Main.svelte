<script lang="ts">
  import { Route } from 'tinro'
  import Nav from './modules/navigation/Nav.svelte'
  import Videos from './modules/videos/Videos.svelte'
</script>

<main>
  <div class="sidebar">
    <Nav />
  </div>

  <Route path="/playlist/:id" let:meta>
    <Videos playlistId={meta.params.id} />
  </Route>
</main>

<style lang="scss">
  main {
    margin: 0 0;
  }

  .sidebar {
    flex-direction: column;
    overflow: scroll;
    background: #f5f5f5;
    position: fixed;
    width: 250px;
    left: 0;
    top: 0;
    bottom: -15px;
    font-size: 14px;
    padding-top: 50px;
    transform: translateX(0px);
    transition: transform 0.3s 0s ease-in-out;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: #cccccc;
    }
  }
</style>
