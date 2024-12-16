import esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["./src/bot/index.ts"],
	bundle: true,
	minify: false,
	outdir: "./dist/bot",
	platform: "node",
	format: "esm",
	target: "esnext",
	banner: {
		js: 'import { createRequire } from "module";const require = createRequire(import.meta.url);',
	},
});
