import { Video } from '../entities/Video'

export class VideoRepo {
  api: any

  constructor(_api: any = null) {
    this.api = gapi
  }

  async getVideos({ playlistIds, limit = 5 }: { playlistIds: string[], limit?: number }): Promise<Video[]> {
    const videos: Video[] = []

    for (const playlistId of playlistIds) {
      const items = (await this.api.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId,
        maxResults: limit
      })).result.items

      items.forEach(({ snippet: { title, publishedAt, videoOwnerChannelId, resourceId: { videoId }}}) => {
        videos.push(new Video(videoId, title, publishedAt, videoOwnerChannelId))
      })
    }

    videos.sort((a, b) => {
      if (a.publishedAt < b.publishedAt) { return 1 }
      if (a.publishedAt > b.publishedAt) { return -1 }
      return 0
    })

    return new Promise(async (r, _) => {
      r(videos)
    })
  }
}
