module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'bgpic': "url('https://gateway.pinata.cloud/ipfs/QmeCH3hWcUPqfTfHfyfiLbHC5QBjzMtba4A94QR7ZHLyFJ/bg5.jpg')",
        'footer-texture': "url('https://gateway.pinata.cloud/ipfs/QmSVVn7y5QPAXhvxw5pscFBfkMCZA3EL551ojm6bmd53cU/hk%20bg/hkwall4.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}