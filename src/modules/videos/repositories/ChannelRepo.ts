import { Channel } from '../entities/Channel'

export class ChannelRepo {
  api: any

  constructor(_api: any = null) {
    this.api = gapi
  }

  getChannelsFromPlaylist({ playlistId }: { playlistId: string }): Promise<Channel[]> {
    return new Promise(async (resolve, _) => {
      const channels: Channel[] = []

      const videoItems = (await this.api.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId
      })).result.items

      const channelIds: string[] = []
      videoItems.forEach(({ snippet: { videoOwnerChannelId }}) => {
        if (!channelIds.includes(videoOwnerChannelId)) {
          channelIds.push(videoOwnerChannelId)
        }
      })

      const channelItems = (await this.api.client.youtube.channels.list({
        part: 'snippet,contentDetails',
        id: channelIds.join(','),
      })).result.items

      channelItems.forEach(({
        id,
        snippet: { title },
        contentDetails: { relatedPlaylists: { uploads } }
      }) => {
        channels.push(new Channel(id, title, uploads))
      })

      resolve(channels)
    })
  }
}
