import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify: false,
  outdir: "./dist/full",
  platform: "node",
  format: "esm",
  target: "esnext",
  banner: {
    js: 'import { createRequire } from "module";const require = createRequire(import.meta.url);',
  },
});
