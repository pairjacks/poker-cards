import assert from "node:assert";
import { describe, it } from "node:test";

import { getCardFace, getCardSuit } from "./value.js";
import { FACE, SUIT } from "./constants.js";

void describe("card/compare", () => {
	void describe("getCardFace", () => {
		void it("should get face from card", () => {
			assert.strictEqual(
				getCardFace(`${FACE.Three}${SUIT.Hearts}`),
				FACE.Three,
			);
		});

		void it("should error on invalid face", () => {
			assert.throws(
				// @ts-expect-error test invalid input
				() => getCardFace("wd"),
				/invalid face w/,
			);
		});
	});

	void describe("compareCards", () => {
		void it("should get suit from card", () => {
			assert.strictEqual(
				getCardSuit(`${FACE.Three}${SUIT.Hearts}`),
				SUIT.Hearts,
			);
		});

		void it("should error on invalid suit", () => {
			assert.throws(
				// @ts-expect-error test invalid input
				() => getCardSuit("3l"),
				/invalid suit l/,
			);
		});
	});
});
