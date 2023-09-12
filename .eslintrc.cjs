/** @type {import("path")} */
const path = require("path");

const testFileSuffixes = /** @type {const} */ (["test", "spec", "mock"]);

/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
	root: true,
	reportUnusedDisableDirectives: true,
	env: { es2022: true, node: true, browser: false },
	parser: "@typescript-eslint/parser",
	parserOptions: { project: "./tsconfig.json", sourceType: "module" },
	plugins: ["filenames", "deprecation"],
	settings: {
		"import/parsers": { "@typescript-eslint/parser": [".ts"] },
		"import/resolver": {
			"eslint-import-resolver-typescript": { project: "./tsconfig.json" },
		},
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:prettier/recommended",
	],
	rules: {
		"camelcase": "off",
		"curly": ["warn", "multi-line", "consistent"],
		"no-console": "off",
		"no-unreachable": "error",
		"@typescript-eslint/consistent-type-definitions": ["warn", "type"],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ disallowTypeAnnotations: false },
		],
		"@typescript-eslint/member-ordering": ["warn"],
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": [
			"error",
			{
				ignoreTypeValueShadow: false,
				ignoreFunctionTypeParameterNameValueShadow: true,
			},
		],
		"no-throw-literal": "off",
		"@typescript-eslint/no-throw-literal": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
		],
		"filenames/match-regex": ["error", "^[a-z0-9-.]+$", true],
		"filenames/match-exported": ["error", "kebab"],
		"import/no-cycle": "error",
		"import/no-self-import": "error",
		"import/no-unused-modules": "error",
		"import/no-useless-path-segments": "error",
		"import/order": [
			"warn",
			{
				"groups": [
					"builtin",
					"external",
					"internal",
					["parent", "sibling", "index"],
					"type",
				],
				"pathGroupsExcludedImportTypes": ["type"],
				"newlines-between": "always",
			},
		],
		"deprecation/deprecation": "warn",
		"prettier/prettier": "warn",
	},
	overrides: [
		{
			files: ["*.c[jt]s"],
			parserOptions: { sourceType: "script" },
			rules: { "@typescript-eslint/no-var-requires": "off" },
		},
		{
			files: ["*.?(c)js"],
			extends: ["plugin:@typescript-eslint/disable-type-checked"],
			rules: { "deprecation/deprecation": "off" },
		},
		{
			files: ["*.?(c)ts"],
			plugins: ["tsdoc"],
			rules: { "tsdoc/syntax": "warn" },
		},
		{
			files: ["./*"],
			rules: { "filenames/match-exported": "off" },
		},
		{
			files: ["src/**/*"],
			env: { node: false, browser: false },
			rules: { "no-console": "error" },
		},
		{
			files: testFilePatterns(),
			env: { node: true },
			rules: {
				"no-console": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-unsafe-argument": "off",
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-unsafe-return": "off",
				"@typescript-eslint/unbound-method": "off",
				"filenames/match-exported": [
					"error",
					"kebab",
					`\\.(${testFileSuffixes.join("|")})$`,
				],
			},
		},
	],
};

/** @param {{ root?: string; extensions?: string }} [options] */
function testFilePatterns({ root = "", extensions = "*" } = {}) {
	return [
		`*.{${testFileSuffixes.join(",")}}`,
		"__{test,tests,mocks,fixtures}__/**/*",
		"__{test,mock,fixture}-*__/**/*",
	].map((pattern) => path.join(root, `**/${pattern}.${extensions}`));
}
