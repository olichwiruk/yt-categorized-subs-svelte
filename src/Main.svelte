<script lang="ts">
  import { Route, router } from 'tinro'
  import { session } from './stores/auth'
  import Modal from 'svelte-simple-modal';

  import Sidebar from './Sidebar.svelte'
  import Nav from './modules/navigation/Nav.svelte'
  import Videos from './modules/videos/Videos.svelte'
</script>

<main>
  <Sidebar>
    <Nav />
    <button on:click={() => { session.revoke(); router.goto('/') }}>Revoke</button>
  </Sidebar>

  <Route path="/playlist/:id" let:meta>
    <Modal>
      <Videos playlistId={meta.params.id} />
    </Modal>
  </Route>
</main>

<style lang="scss">
  main {
    margin: 0 0;
  }
</style>
