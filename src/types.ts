export const MODES = {
    chul: "Chutz La'aretz",
    il: "Israel",
    pro: "Pro",
};

export type Mode = keyof typeof MODES;

export function stringIsMode(mode: string | null): mode is Mode {
    return mode != null && ["chul", "il", "pro"].includes(mode);
}
