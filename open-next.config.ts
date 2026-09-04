// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";

export default defineCloudflareConfig({
	// R2-backed ISR cache + DO revalidation queue + D1 tag cache for on-demand
	// revalidation (revalidateTag/revalidatePath used by the admin actions).
	// See https://opennext.js.org/cloudflare/caching for more details
	incrementalCache: r2IncrementalCache,
	queue: doQueue,
	tagCache: d1NextTagCache,
});
