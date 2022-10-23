# Cloudflare Worker using Google OAuth2 Library

### Background

This is a demo repo showing off the usage of my OAuth2 module [here](https://github.com/Schachte/cloudflare-google-auth). The goal is 
to easily authenticate with the Google Cloud HTTP API when using the OAuth2 flow for a service account from within a Cloudflare Worker.

### Deployment

The deployment deploys to Cloudflare Workers using the `wrangler` CLI tool.

1. `wrangler login`
2. `wrangler publish`

**Note:** Ensure you've set the environment variable `GCP_SERVICE_ACCOUNT` with your service account JSON key downloaded from Google.