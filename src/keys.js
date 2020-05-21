const keys = Object.freeze({
  debug: process.env.REACT_APP_DEBUG || false,
  serverUri:
    process.env.REACT_APP_SERVER_URI || `https://${window.location.hostname}`,
});

export default keys;
