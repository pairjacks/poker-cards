import { defineConfig } from "oxlint";

export default defineConfig({
	options: {
		typeAware: true,
		typeCheck: true,
		maxWarnings: 0,
		reportUnusedDisableDirectives: "error",
	},
	ignorePatterns: [".vscode/*", "**/dist/*", "**/reports/*"],
	plugins: ["oxc", "eslint", "typescript", "import", "promise", "unicorn"],
	categories: { correctness: "error", suspicious: "error", perf: "error" },
	env: { node: true, browser: false },
	settings: { vitest: { typecheck: true } },
	rules: {
		"eslint/curly": ["error", "multi-line", "consistent"],
		"eslint/eqeqeq": "error",
		"eslint/no-shadow": ["error", { ignoreTypeValueShadow: false }],
		"eslint/no-unreachable": "error",
		"eslint/no-unused-vars": [
			"error",
			{
				args: "all",
				argsIgnorePattern: "^_",
				caughtErrors: "all",
				caughtErrorsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				ignoreRestSiblings: true,
			},
		],

		"typescript/consistent-type-definitions": ["error", "interface"],
		"typescript/consistent-type-imports": [
			"error",
			{ disallowTypeAnnotations: true },
		],
		"typescript/no-explicit-any": "error",
		"typescript/no-non-null-assertion": "error",

		"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
		"import/no-cycle": "error",

		"promise/always-return": ["error", { ignoreLastCallback: true }],

		"unicorn/catch-error-name": ["error", { name: "cause" }],
		"unicorn/filename-case": ["error", { cases: { kebabCase: true } }],
		"unicorn/prefer-node-protocol": "error",
		"unicorn/prefer-type-error": "error",
		"unicorn/no-array-reverse": "off",
		"unicorn/no-array-sort": "off",
	},
	overrides: [
		{
			files: ["**/typings/*.d.ts"],
			rules: { "import/unambiguous": "off" },
		},

		{
			files: ["src/**"],
			env: { node: false, browser: false },
			rules: {
				"eslint/no-console": "error",
				"import/no-nodejs-modules": "error",
			},
		},

		{
			files: ["src/**/*.test.*"],
			plugins: ["vitest"],
			rules: {
				"import/no-nodejs-modules": "off",
			},
		},
	],
});
