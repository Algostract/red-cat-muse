export default defineOAuthGoogleEventHandler({
  config: {},
  async onSuccess(event, { user }) {
    await setUserSession(event, { user, loggedInAt: Date.now() })
    return sendRedirect(event, '/')
  },

  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
