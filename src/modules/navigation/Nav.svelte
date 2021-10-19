<script lang="ts">
  import { active } from 'tinro';
  import { PlaylistRepo } from './repositories/PlaylistRepo'

  const playlistRepo = new PlaylistRepo()
  let playlistsPromise = playlistRepo.getPlaylists()
</script>

<main>
  {#await playlistsPromise then playlists}
    {#each playlists as playlist}
      <a href="/playlist/{playlist.id}" use:active>
        <div class="item">
          {playlist.name}
        </div>
      </a>
    {/each}
  {/await}
</main>

<style lang="scss">
  main {
    text-align: left;
    max-width: 340px;
    margin: 0 0;
  }

  a .item {
    color: #101010;
    padding: 0.75em 1.5em;

    &:hover {
      background: #dddddd;
    }
  }

  :global(.active){
    .item {
      background: #d5d5d5;
      font-weight: 500;
    }
  }
</style>
