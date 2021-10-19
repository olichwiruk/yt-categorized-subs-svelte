export class Channel {
  id: string
  name: string
  uploadsPlaylistId: string

  constructor (id: string, name: string, uploadsPlaylistId: string) {
    this.id = id
    this.name = name
    this.uploadsPlaylistId = uploadsPlaylistId
  }
}
