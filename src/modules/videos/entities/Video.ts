export class Video {
  id: string
  title: string
  channelId: string
  publishedAt: Date

  constructor (id: string, title: string, publishedAt: Date, channelId: string) {
    this.id = id
    this.title = title
    this.publishedAt = publishedAt
    this.channelId = channelId
  }
}
