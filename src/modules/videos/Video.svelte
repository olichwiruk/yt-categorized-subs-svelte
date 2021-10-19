<script lang="ts">
  import type { Video } from './entities/Video'
  export let video: Video;
</script>

<main>
  <a target="_blank" href="https://www.youtube.com/watch?v={video.id}">
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
  </a>
</main>

<style lang="scss">
  main {
    width: 210px;
    margin: 0 0;
  }

  .thumbnail {
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

  .header {
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
</style>
