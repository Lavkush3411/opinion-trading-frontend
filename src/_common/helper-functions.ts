export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString('en-IN', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // your current tz
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}
