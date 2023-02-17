import type { SquareInfoType } from "$lib/types/chess.types";

export const getFullSquareInfo = (info: string | number): SquareInfoType  => {
    if(info === "-"){
        return { index: undefined, code: undefined };
    }
    
    if (typeof info === "string") {
        const [file, rank] = info.split("");
        const index = (8 - parseInt(rank)) * 8 + (file.charCodeAt(0) - 97);
        return { index, code: info };

    } else {
        const file = String.fromCharCode(97 + (info % 8));
        const rank = 8 - Math.floor(info / 8);
        const code = `${file}${rank}`;
        return { index: info, code };
    }
}