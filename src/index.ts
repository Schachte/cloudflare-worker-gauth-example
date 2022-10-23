// import the library - https://github.com/Schachte/cloudflare-google-auth
import GoogleAuth, { GoogleKey } from 'cloudflare-workers-and-google-oauth'

// JSON containing the key for the service account
// download from GCS
export interface Env {
	GCP_SERVICE_ACCOUNT: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {

		// https://developers.google.com/identity/protocols/oauth2/scopes
		const scopes: string[] = ['https://www.googleapis.com/auth/devstorage.full_control']
		const googleAuth: GoogleKey = JSON.parse(env.GCP_SERVICE_ACCOUNT)

		// initialize the service
		const oauth = new GoogleAuth(googleAuth, scopes)
		const token = await oauth.getGoogleAuthToken()

		// Example: fetch object from GCS
		if (token !== undefined) {
			const res = await fetchObjectFromGCS(token, "media.ryan-schachte.com", "image.png")
			return new Response(res.body, { headers: { 'Content-Type': 'image/png' } });
		}

		throw new Error("generating Google auth token failed")
	},
};

/**
 * Calls GCS to fetch an object out of storage from a private bucket
 * 
 * @param token is the newly generated OAuth2 bearer token 
 * @param bucketName the bucket in which your target object is stored within
 * @param objectName the name of the object you want to pull (ie. my_image.png)
 * @returns the 
 */
const fetchObjectFromGCS = async (token: string, bucketName: string, objectName: string): Promise<Response> => {
	return await fetch(
		`https://storage.googleapis.com/storage/v1/b/${bucketName}/o/${objectName}?alt=media`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'image/png',
			'Accept': 'image/png',
		},
	})
}
