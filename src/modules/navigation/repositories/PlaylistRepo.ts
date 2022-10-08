import { Playlist } from '../entities/Playlist'

export class PlaylistRepo {
  api: any

  constructor(_api: any = null) {
    this.api = gapi
  }

  getPlaylists({ limit = 50 }: { limit?: number } = {}): Promise<Playlist[]> {
    return new Promise(async (resolve, _) => {
      const playlists: Playlist[] = []
      this.api.client.load('youtube', 'v3', async () => {
        const items = (await this.api.client.youtube.playlists.list({
          part: 'snippet',
          mine: true,
          maxResults: limit + 1
        })).result.items

        items.forEach(({ id, snippet: { title } }) => {
          if (title.startsWith("K - ")) {
            playlists.push(new Playlist(id, title.replace("K - ", "")))
          }
        })
        playlists.sort((a, b) => {
          if (a.name < b.name) { return -1 }
          if (a.name > b.name) { return 1 }
          return 0
        })
        resolve(playlists)
      });
    })
  }
}
