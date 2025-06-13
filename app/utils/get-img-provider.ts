const urlRegex = new RegExp(
  '^' +
    // optional protocol
    '(https?:\\/\\/)?' +
    // domain name or IPv4 (v4) address
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    // optional port
    '(\\:\\d+)?' +
    // optional path
    '(\\/[-a-z\\d%_.~+]*)*' +
    // optional query string
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    // optional fragment
    '(\\#[-a-z\\d_]*)?' +
    '$',
  'i'
)

export default function (imageUrl: string) {
  if (!urlRegex.test(imageUrl)) {
    return 'uploadcare'
  } else {
    return 'ipx'
  }
}
