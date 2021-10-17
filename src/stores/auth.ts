import { writable } from 'svelte/store'

let auth2: any

const { subscribe, update } = writable(null)

// @ts-ignore
gapi.load('auth2', () => {
  // @ts-ignore
  auth2 = gapi.auth2.init({
    client_id: "__CLIENT_ID__",
    scope: 'https://www.googleapis.com/auth/youtube.readonly'
  })

  auth2.isSignedIn.listen((loggedIn: boolean) => {
    if (loggedIn) {
      const u = auth2.currentUser.get()
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
  })
})

const signin = () => auth2.signIn()

const logout = () => auth2.signOut()

export const user = {
  subscribe,
  signin,
  logout
}
