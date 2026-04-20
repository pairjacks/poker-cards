import { defineConfig } from "oxfmt";

export default defineConfig({
	ignorePatterns: ["**/dist/**", "**/reports/**", "pnpm-*.yaml"],
	printWidth: 80,
	useTabs: true,
	sortImports: {
		order: "asc",
		groups: [
			["builtin"],
			["external"],
			["internal", "subpath"],
			["parent"],
			["sibling", "index"],
			["type"],
		],
	},
	overrides: [
		{ files: ["*.{json,jsonc}"], options: { trailingComma: "none" } },
	],
});
