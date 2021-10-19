<script lang="ts">
  export let playlistId: string;

  import type { Channel } from './entities/Channel'
  import { ChannelRepo } from './repositories/ChannelRepo'
  import type { Video } from './entities/Video'
  import { VideoRepo } from './repositories/VideoRepo'

  const channelRepo = new ChannelRepo()
  const videoRepo = new VideoRepo()

  let channelsPromise: Promise<Channel[]>
  $: channelsPromise = channelRepo.getChannelsFromPlaylist({ playlistId })
  let videosPromise: Promise<Video[]>
  $: videosPromise = new Promise(async (r, _) => {
    let channels = await channelsPromise
    let v = await videoRepo.getVideos({ limit: 30, playlistIds: channels.map(ch => ch.uploadsPlaylistId) })
    r(v)
  })
</script>

<main>
  {#await channelsPromise}
    Loading...
  {:then channels}
    {#each channels as channel}
      | {channel.name} |
    {/each}
  {/await}

  <br><br>

  {#await videosPromise}
    Loading...
  {:then videos}
    {#each videos as video}
      <a target="_blank" href="https://www.youtube.com/watch?v={video.id}">{video.title}</a>
      <br>
    {/each}
  {/await}
</main>

<style lang="scss">
  main {
    margin: 0 0;
  }
</style>
