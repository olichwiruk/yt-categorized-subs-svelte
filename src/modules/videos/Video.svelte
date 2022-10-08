<script lang="ts">
  import { getContext } from 'svelte';
  const { open } = getContext('simple-modal');

  import Player from './Player.svelte';

  import type { Video } from './entities/Video'
  export let video: Video;

  const showPlayer = () => {
    open(Player, { id: video.id }, {
      closeButton: false,
      styleWindow: {
        width: '680px',
        height: '400px',
        background: 'rgba(0, 0, 0, 0)'
      },
    });
  };
</script>

<main>
  <div class="video" on:click={showPlayer}>
    <div class="thumbnail">
      <img loading="lazy" width="210" alt={video.title} src={video.thumbnailUrl} />
      <span class="duration">{video.duration}</span>
    </div>
    <div class="header">
      <span class="title">{video.title}</span>
      <br>
      <a target="blank" href="https://www.youtube.com/channel/{video.channel.id}">
        <span class="channel-name">
          {video.channel.name}
        </span>
      </a>
      <br>
      <span title={video.publishedAt.formatted} class="published-at">{video.publishedAt.fromNow}</span>
    </div>
  </div>
</main>

<style lang="scss">
  main {
    width: 210px;
    margin: 0 0;
  }

  .video {
    &:hover {
      cursor: pointer;
    }

    & .thumbnail {
      position: relative;

      & .duration {
        position: absolute;
        right: 7px;
        bottom: 7px;
        border-radius: 3px;
        line-height: 1.3em;
        font-size: 13.5px;
        font-weight: 500;
        padding-left: 2%;
        padding-right: 2%;
        color: #e3e3e3;
        background-color: #000;
        opacity: 0.85;
      }
    }

    & .header {
      text-align: left;
      color: #101010;

      & .title {
        font-weight: 500;
      }

      & .channel-name {
        color: #686464;
        font-size: 14px;

        &:hover {
          color: #575353;
        }
      }

      .published-at {
        color: #686464;
        font-size: 14px;
      }
    }
  }
</style>
