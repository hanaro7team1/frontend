export function dateweekFormat(localDate: string): string {
    if (!localDate) return '';
    const s = localDate.replace(/\D/g, '');
    if (s.length !== 8) return '';
    const yyyy = s.slice(0, 4), yy = s.slice(2,4), m = s.slice(4, 6), d = s.slice(6, 8);

    const dt = new Date(`${yyyy}-${m}-${d}T00:00:00+09:00`);
    const weekday = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        weekday: 'short',
    }).format(dt);
    
    return `${yy}.${m}.${d} (${weekday})`;
}