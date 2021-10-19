import { Video } from '../entities/Video'

export class VideoRepo {
  api: any

  constructor(_api: any = null) {
    this.api = gapi
  }

  async getVideos({ playlistIds, limit = 5 }: { playlistIds: string[], limit?: number }): Promise<Video[]> {
    let videos: Video[] = []

    for (const playlistId of playlistIds) {
      const items = (await this.api.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId,
        maxResults: limit
      })).result.items

      items.forEach(({
        snippet: {
          title, publishedAt,
          videoOwnerChannelId, videoOwnerChannelTitle,
          resourceId: { videoId },
          thumbnails: { medium: { url }}
        }
      }) => {
        videos.push(new Video(videoId, title, url, publishedAt, { id: videoOwnerChannelId, name: videoOwnerChannelTitle }))
      })
    }

    videos.sort((a, b) => {
      if (a.publishedAt.raw < b.publishedAt.raw) { return 1 }
      if (a.publishedAt.raw > b.publishedAt.raw) { return -1 }
      return 0
    })

    return new Promise(async (r, _) => {
      r(videos)
    })
  }

  async fetchDurations(videos: Video[]) {
    const items = (await this.api.client.youtube.videos.list({
      part: 'contentDetails',
      id: videos.map(v => v.id).join(',')
    })).result.items

    items.forEach(({ id, contentDetails: { duration } }) => {
      const video = videos.find(v => v.id === id)
      video.setDuration(duration)
    })
  }
}
