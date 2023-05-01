import { defineConfig } from "tsup";

export default defineConfig(() => {
	return {
		entry: ["src/index.ts"],
		format: ["cjs", "esm"],
		dts: true,
		sourcemap: true,
		clean: true,
		esbuildOptions: (options) => {
			options.target = [
				"node16",
				"chrome58",
				"safari11",
				"firefox57",
				"edge58",
			];
		},
	};
});
