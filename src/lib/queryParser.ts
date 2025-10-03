import type { ParsedQuery } from '@/types';
import citiesData from '@/data/cities.json';
import categoriesData from '@/data/categories.json';

const removeDiacritics = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export const parseQuery = (raw: string): ParsedQuery => {
  const normalized = removeDiacritics(raw);

  const result: ParsedQuery = { raw };

  // Parse city
  for (const city of citiesData) {
    const cityNorm = removeDiacritics(city.name);
    if (normalized.includes(cityNorm)) {
      result.city = city.slug;

      // Parse areas (sectors/neighborhoods)
      if (city.areas) {
        const foundAreas = city.areas.filter((area) =>
          normalized.includes(removeDiacritics(area))
        );
        if (foundAreas.length > 0) {
          result.areas = foundAreas;
        }
      }
      break;
    }
  }

  // Parse category
  const categoryKeywords: Record<string, string[]> = {
    instalator: ['instalator', 'termice', 'sanitare', 'centrala', 'conducte'],
    electrician: ['electrician', 'electric', 'tablou', 'curent', 'prize'],
    curatenie: ['curatenie', 'curatat', 'igienizare', 'dezinfectie'],
    avocat: ['avocat', 'juridic', 'avocatura', 'divorț', 'divort'],
    'web-developer': ['web', 'developer', 'programator', 'website', 'magazin online', 'aplicatie'],
    'mecanic-auto': ['mecanic', 'auto', 'service', 'masina', 'reparatii auto'],
    stomatolog: ['stomatolog', 'dentist', 'dentar', 'dinti'],
    frizerie: ['frizerie', 'frizer', 'barbershop', 'coafor', 'tuns'],
  };

  for (const [slug, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((kw) => normalized.includes(kw))) {
      result.category = slug;
      break;
    }
  }

  // Parse urgency
  if (/(azi|urgent|acum|imediat)/i.test(normalized)) {
    result.urgency = 'azi';
  } else if (/maine/i.test(normalized)) {
    result.urgency = 'maine';
  } else if (/(saptamana|weekend)/i.test(normalized)) {
    result.urgency = 'curand';
  } else {
    result.urgency = 'flexibil';
  }

  // Parse budget
  if (/(ieftin|mic|buget mic)/i.test(normalized)) {
    result.budgetLevel = 'mic';
  } else if (/(premium|scump|calitate|mare)/i.test(normalized)) {
    result.budgetLevel = 'mare';
  } else {
    result.budgetLevel = 'mediu';
  }

  // Parse rooms
  const roomsMatch = raw.match(/(\d+)\s*camer/i);
  if (roomsMatch) {
    result.rooms = parseInt(roomsMatch[1]);
  }

  return result;
};
