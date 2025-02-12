import { days, IDay } from "./tachanunDays";
import { HDate, HebrewCalendar, HolidayEvent } from "@hebcal/core";
import { find } from "lodash";
import { Mode } from "../types";

export interface INoTachanun {
    description: string;
    source: string;
    dayBefore?: boolean;
    subtitle?: string;
    mincha?: boolean;
}

export function noTachanun(
    date: HDate | Date,
    mode: Mode,
    recursion?: boolean,
): INoTachanun | undefined {
    const resolvedDate = typesafeIsHDate(date) ? date : new HDate(date);

    const dayOfMonth = resolvedDate.getDate();

    const noTachanunDate = find(
        days,
        (day: IDay) =>
            day.month ===
                resolvedDate.getMonthName().toUpperCase().replace("'", "") &&
            day.startDay <= dayOfMonth &&
            day.endDay >= dayOfMonth,
    );

    if (noTachanunDate) {
        return {
            description:
                (mode === "il" ? noTachanunDate.descriptionIl : undefined) ??
                noTachanunDate.description,
            source: noTachanunDate.source,
            dayBefore: noTachanunDate.dayBefore,
        };
    }

    if (dayOfMonth === 1 || dayOfMonth === 30) {
        return {
            description: `Rosh Chodesh ${resolvedDate.add("1d").getMonthName()}`,
            source: "Peninei_Halakhah%2C_Prayer.21.7.2",
            dayBefore: true,
        };
    }

    if (resolvedDate.getDay() === 6) {
        return {
            description: "Shabbat Kodesh",
            source: "Peninei_Halakhah%2C_Prayer.21.7.2",
            dayBefore: true,
        };
    }

    if (
        resolvedDate.getMonth() === 10 &&
        resolvedDate.getDay() === 3 &&
        dateIsHoliday(resolvedDate, e => e.chanukahDay != null)
    ) {
        // chanuka if kislev if 29/30 days
        return {
            description: "Chanukah",
            source: "Peninei_Halakhah%2C_Prayer.21.7.3",
            dayBefore: false,
        };
    }

    // Yom Ha'atzmaut is dynamic
    if (dateIsHoliday(resolvedDate, e => e.desc === "Yom HaAtzma'ut")) {
        return {
            description: "Yom Haatzmaut",
            source: "Peninei_Halakhah%2C_Prayer.21.7.4",
            dayBefore: true,
        };
    }

    // Tisha b'av can be nidche
    if (dateIsHoliday(resolvedDate, e => e.desc === "Tish'a B'Av")) {
        return {
            description: "Tisha B'Av",
            source: "Peninei_Halakhah%2C_Prayer.21.7.3",
            dayBefore: true,
        };
    }

    if (mode == "il" && dateIsPurimMeshulash(resolvedDate)) {
        return {
            description: "Purim Meshulash",
            source: "Peninei_Halakhah%2C_Prayer.21.7.3",
            dayBefore: false,
            subtitle: "...only in Yerushalaim!",
        };
    }

    // week after shavuot only in chu"l
    if (
        mode == "chul" &&
        resolvedDate.getMonthName() === "Sivan" &&
        resolvedDate.getDate() == 13
    ) {
        return {
            description: "the week after Shavuot",
            source: "Peninei_Halakhah%2C_Prayer.21.7.3",
            dayBefore: false,
        };
    }

    if (!recursion) {
        const tomorrow = noTachanun(resolvedDate.add("1d"), mode, true);

        if (tomorrow && tomorrow.dayBefore) {
            return {
                mincha: true,
                subtitle: "...but there's no Tachanun at Mincha!",
                description: tomorrow.description,
                source: "Peninei_Halakhah%2C_Prayer.21.7.3",
            };
        }
    }
}

const typesafeIsHDate = HDate.isHDate as (obj: any) => obj is HDate;

function dateIsHoliday(
    date: HDate,
    predicate: (d: HolidayEvent) => boolean,
): boolean {
    const events = HebrewCalendar.getHolidaysOnDate(date);

    if (events == null || events.length === 0) {
        return false;
    }

    return find(events, predicate) != null;
}

function dateIsPurimMeshulash(date: HDate) {
    return (
        (date.getMonthName() === "Adar" || date.getMonthName() === "Adar II") &&
        date.getDate() === 16 &&
        date.getDay() === 0
    );
}
