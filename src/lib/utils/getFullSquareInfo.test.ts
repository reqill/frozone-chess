import { getFullSquareInfo } from "./getFullSquareInfo";
import {describe, it, expect} from "vitest"

describe("getFullSquareInfo", () => {
    const testCases = [
        { input: "a8", expected: { index: 0, code: "a8" }},
        { input: "h1", expected: { index: 63, code: "h1" }},
        { input: 0, expected: { index: 0, code: "a8" }},
        { input: 63, expected: { index: 63, code: "h1" }},
        { input: "a1", expected: { index: 56, code: "a1" }},
        { input: "h8", expected: { index: 7, code: "h8" }},
        { input: 56, expected: { index: 56, code: "a1" }},
        { input: 7, expected: { index: 7, code: "h8" }},
        { input: "b2", expected: { index: 49, code: "b2" }},
        { input: "a7", expected: { index: 8, code: "a7" }},
        { input: 8, expected: { index: 8, code: "a7" }},
        { input: "g7", expected: { index: 14, code: "g7" }},
        { input: 49, expected: { index: 49, code: "b2" }},
        { input: 14, expected: { index: 14, code: "g7" }},
        { input: "c3", expected: { index: 42, code: "c3" }},
        { input: "-", expected: {index: undefined, code: undefined }},
    ];

    it("should return the correct index and code for a square", () => {
        testCases.forEach(({ input, expected }) => {
            expect(getFullSquareInfo(input)).toEqual(expected);
        });
    });
});
