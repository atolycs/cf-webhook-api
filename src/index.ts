/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		//return new Response('Hello World!');
		const post_data = await request.json();

		const webhook_body = {
			"content": post_data.body
		}

		console.log(post_data)
		// @ts-ignore
		await fetch(env.API_HOST, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(webhook_body)
		})
		return new Response('OK')
	}
} satisfies ExportedHandler<Env>;
