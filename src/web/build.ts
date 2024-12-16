import esbuild from "esbuild";

await esbuild.build({
	entryPoints: ["./src/web/index.ts"],
	bundle: true,
	minify: false,
	outdir: "./dist/web",
	platform: "node",
	format: "esm",
	target: "esnext",
	banner: {
		js: 'import { createRequire } from "module";const require = createRequire(import.meta.url);',
	},
});
