// d-day 계산용
export function dDayCal(localDate: string): number {
    const s = localDate.replace(/\D/g, '');
    if (s.length !== 8) return NaN;
    const y = +s.slice(0, 4), m = +s.slice(4, 6), d = +s.slice(6, 8);

    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date()).reduce<Record<string,string>>((a,p) => {
        if (p.type === 'year' || p.type === 'month' || p.type === 'day') a[p.type] = p.value;
        return a;
    }, {});

    const ty = +parts.year, tm = +parts.month, td = +parts.day;

    const epochDay = (Y:number,M:number,D:number) => Math.floor(Date.UTC(Y, M-1, D) / 86_400_000);
    return epochDay(y, m, d) - epochDay(ty, tm, td);
}