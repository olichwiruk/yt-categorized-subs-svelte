import { writable } from 'svelte/store'

const { subscribe, update } = writable(null)

gapi.load('client:auth2', (async () => {
  await gapi.client.init({
    clientId: "854593356609-06de3ba5ml6mtdvubj3561996h9ajm7k.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    scope: 'https://www.googleapis.com/auth/youtube.readonly'
  })

  gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
}))
const updateSigninStatus = (isSignedIn: boolean) => {
  if (isSignedIn) {
    const u = gapi.auth2.getAuthInstance().currentUser.get()
    const profile = u.getBasicProfile()
    update(() => ({
      profile: {
        id: profile.getId(),
        name: profile.getName(),
        image: profile.getImageUrl(),
        email: profile.getEmail()
      },
      token: u.getAuthResponse().id_token
    }))
  } else {
    update(() => null)
  }
}

const signin = () => gapi.auth2.getAuthInstance().signIn()

const logout = () => gapi.auth2.getAuthInstance().signOut()

export const user = {
  subscribe,
  signin,
  logout
}
