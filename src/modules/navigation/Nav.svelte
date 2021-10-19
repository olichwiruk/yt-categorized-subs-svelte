<script lang="ts">
  import { PlaylistRepo } from './repositories/PlaylistRepo'

  const playlistRepo = new PlaylistRepo()
  let playlistsPromise = playlistRepo.getPlaylists()
</script>

<main>
  {#await playlistsPromise then playlists}
    {#each playlists as playlist}
      <a href="/playlist/{playlist.id}">{playlist.name}</a>
      <br>
    {/each}
  {/await}
</main>

<style lang="scss">
  main {
    text-align: left;
    padding: 1em;
    max-width: 340px;
    margin: 0 0;
  }
</style>
