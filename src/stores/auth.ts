import { writable } from 'svelte/store'

const { subscribe, update } = writable(null)

let client

gapi.load('client', (() => {
  client = google.accounts.oauth2.initTokenClient({
    client_id: "854593356609-06de3ba5ml6mtdvubj3561996h9ajm7k.apps.googleusercontent.com",
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    callback: async (tokenResponse) => {
      update(() => tokenResponse.access_token);
    }
  })
}))

const authorize = () =>  {
  client.requestAccessToken()
}
const revoke = () =>  {
  update(() => null)
}

export const session = {
  authorize,
  revoke
}

export const accessToken = { subscribe }
