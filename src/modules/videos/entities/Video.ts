import moment from 'moment'

export class Video {
  id: string
  title: string
  thumbnailUrl: string
  channel: { id: string, name: string }
  publishedAt: { raw: Date, formatted: string, fromNow: string }
  duration: string

  constructor (id: string, title: string, thumbnailUrl: string, publishedAt: Date, channel: { id: string, name: string}) {
    this.id = id
    this.title = title
    this.thumbnailUrl = thumbnailUrl

    const formattedPublishedAt = this.formatPublishedAt(publishedAt)
    this.publishedAt = {
      raw: publishedAt,
      formatted: formattedPublishedAt.formatted,
      fromNow: formattedPublishedAt.fromNow
    }

    this.channel = channel
    this.duration = "00:00"
  }

  setDuration (duration: string) {
    this.duration = this.formatDuration(duration)
  }

  private formatPublishedAt(publishedAt: Date) {
    const m = moment(publishedAt, 'YYYY-MM-DD HH:mm:ss')
    return {
      formatted: m.format("DD MMM YYYY HH:mm:ss"),
      fromNow: m.fromNow()
    }
  }

  private formatDuration(duration: string) {
    const momentDuration = moment.duration(duration);
    let durationFormat = 'mm:ss'
    if (momentDuration.hours() > 0) {
      durationFormat = 'HH:mm:ss';
    }
    return moment.utc(momentDuration.asMilliseconds()).format(durationFormat);
  }
}
