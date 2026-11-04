import type { CollectionEntry } from 'astro:content';

type CourseData = CollectionEntry<'courses'>['data'];

export interface CourseStat {
    label: string;
    value: string;
}

export interface CourseSummary {
    id: string;
    nom: string;
    sport: string;
    lieu: string;
    coordonnees?: string;
    dateStr: string;
    stats: CourseStat[];
    classement?: string;
    classementCategorie?: string;
    description: string;
    photos: string[];
    detailUrl: string;
}

const RUNNING_SPORTS = ['course', 'trail', 'running', 'marathon', 'cross', 'semi', 'ultra', 'marche'];
const CYCLING_SPORTS = ['vélo', 'velo', 'cyclisme', 'gravel', 'vtt', 'cyclo'];

function normalize(s: string) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function isRunning(sport: string) {
    const s = normalize(sport);
    // "course à pied", "trail", … but not multisport events like triathlon/duathlon
    if (s.includes('thlon') || s.includes('swimrun')) return false;
    return RUNNING_SPORTS.some((k) => s.includes(normalize(k)));
}

function isCycling(sport: string) {
    const s = normalize(sport);
    return CYCLING_SPORTS.some((k) => s.includes(normalize(k)));
}

/** "3:25:12" → seconds; "45:30" → seconds (mm:ss). */
export function parseTemps(temps: string): number | null {
    const parts = temps.split(':').map(Number);
    if (parts.some((n) => Number.isNaN(n))) return null;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return null;
}

/** 12345 s → "3 h 25 min 45 s" style, compact: "3h25'45" */
export function formatTemps(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return h > 0 ? `${h}h${mm}'${ss}` : `${m}'${ss}`;
}

const nf = (digits: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits });

export function formatDistance(km: number): string {
    return `${nf(km < 10 ? 2 : 1).format(km)} km`;
}

export function formatDateFr(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Distance, D+, temps, plus allure (course à pied) or vitesse (vélo) when computable. */
export function courseStats(data: CourseData): CourseStat[] {
    const stats: CourseStat[] = [];
    if (data.distance) stats.push({ label: 'Distance', value: formatDistance(data.distance) });
    if (data.denivele !== undefined) stats.push({ label: 'D+', value: `${nf(0).format(data.denivele)} m` });

    const seconds = data.temps ? parseTemps(data.temps) : null;
    if (seconds) stats.push({ label: 'Temps', value: formatTemps(seconds) });

    if (seconds && data.distance) {
        if (isRunning(data.sport)) {
            const pace = seconds / data.distance; // s/km
            const pm = Math.floor(pace / 60);
            const ps = String(Math.round(pace % 60)).padStart(2, '0');
            stats.push({ label: 'Allure', value: ps === '60' ? `${pm + 1}'00/km` : `${pm}'${ps}/km` });
        } else if (isCycling(data.sport)) {
            stats.push({ label: 'Vitesse', value: `${nf(1).format(data.distance / (seconds / 3600))} km/h` });
        }
    }
    return stats;
}

/** First paragraph and up to 3 images of the Markdown body. */
export function extractCourseInfo(body: string) {
    let description = '';
    const photos: string[] = [];
    for (const line of body.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const img = trimmed.match(/!\[.*?\]\((.*?)\)/);
        if (img) {
            if (photos.length < 3) photos.push(img[1]);
        } else if (!description && !trimmed.startsWith('#') && !trimmed.startsWith('<')) {
            description = trimmed;
        }
    }
    return { description, photos };
}

export function toCourseSummary(entry: CollectionEntry<'courses'>): CourseSummary {
    const { description, photos } = extractCourseInfo(entry.body || '');
    return {
        id: entry.id,
        nom: entry.data.nom,
        sport: entry.data.sport,
        lieu: entry.data.lieu,
        coordonnees: entry.data.coordonnees,
        dateStr: formatDateFr(entry.data.date),
        stats: courseStats(entry.data),
        classement: entry.data.classement,
        classementCategorie: entry.data.classementCategorie,
        description,
        photos,
        detailUrl: `/courses/${entry.id}`,
    };
}
