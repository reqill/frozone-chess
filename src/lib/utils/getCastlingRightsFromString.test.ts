import { describe, it, expect } from "vitest"
import { getCastlingRightsFromString } from "./getCastlingRightsFromString"

describe("getCastlingRightsFromString", () => {
    const testCases = [
        {input: "-", expected: {white: {kingSide: false, queenSide: false}, black: {kingSide: false, queenSide: false}}},
        {input: "KQkq", expected: {white: {kingSide: true, queenSide: true}, black: {kingSide: true, queenSide: true}}},
        {input: "KQk", expected: {white: {kingSide: true, queenSide: true}, black: {kingSide: true, queenSide: false}}},
        {input: "KQq", expected: {white: {kingSide: true, queenSide: true}, black: {kingSide: false, queenSide: true}}},
        {input: "Kkq", expected: {white: {kingSide: true, queenSide: false}, black: {kingSide: true, queenSide: true}}},
        {input: "Qkq", expected: {white: {kingSide: false, queenSide: true}, black: {kingSide: true, queenSide: true}}},
        {input: "KQ", expected: {white: {kingSide: true, queenSide: true}, black: {kingSide: false, queenSide: false}}},
        {input: "Kk", expected: {white: {kingSide: true, queenSide: false}, black: {kingSide: true, queenSide: false}}},
        {input: "Kq", expected: {white: {kingSide: true, queenSide: false}, black: {kingSide: false, queenSide: true}}},
        {input: "Qk", expected: {white: {kingSide: false, queenSide: true}, black: {kingSide: true, queenSide: false}}},
        {input: "Qq", expected: {white: {kingSide: false, queenSide: true}, black: {kingSide: false, queenSide: true}}},
        {input: "K", expected: {white: {kingSide: true, queenSide: false}, black: {kingSide: false, queenSide: false}}},
        {input: "Q", expected: {white: {kingSide: false, queenSide: true}, black: {kingSide: false, queenSide: false}}},
        {input: "k", expected: {white: {kingSide: false, queenSide: false}, black: {kingSide: true, queenSide: false}}},
        {input: "q", expected: {white: {kingSide: false, queenSide: false}, black: {kingSide: false, queenSide: true}}},
    ]

    it("should return the correct castling rights", () => {
        testCases.forEach(({input, expected}) => {
            expect(getCastlingRightsFromString(input)).toEqual(expected)
        })
    })
})

