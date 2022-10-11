<script lang="ts">
  export let playlistId: string;
  import VideoComponent from './Video.svelte'

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
    let videos = await videoRepo.getVideos({ limit: 30, playlistIds: channels.map(ch => ch.uploadsPlaylistId) })

    await videoRepo.fetchDurations(videos.slice(0, 50))
    r(videos)
  })
</script>

<main>
  {#await channelsPromise}
    Loading...
  {:then channels}
    {#each channels as channel}
      | <a target="_blank" href="https://www.youtube.com/channel/{channel.id}">{channel.name}</a> |
    {/each}
  {/await}

  {#await videosPromise}
    <br><br>
    Loading...
  {:then videos}
    <div class="videos">
      {#each videos as video}
        <VideoComponent {video} />
      {/each}
    </div>
  {/await}
</main>

<style lang="scss">
  main {
    margin: 0 0;
  }

  .videos {
    padding: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    grid-gap: 30px 10px;
    transition: margin-left .3s 0s ease-in-out;
  }
</style>
