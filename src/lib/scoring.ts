import type { Company, ParsedQuery } from '@/types';

export const scoreCompany = (
  company: Company,
  parsed?: ParsedQuery,
  category?: string,
  city?: string
): number => {
  let score = 0;

  // Category match
  if (category && company.categories.includes(category)) {
    score += 50;
  }

  // City match
  if (city && company.city === city) {
    score += 25;
  }

  // Area match
  if (parsed?.areas && parsed.areas.length > 0) {
    const matchedAreas = parsed.areas.filter((a) => company.areas?.includes(a));
    score += matchedAreas.length * 10;
  }

  // Verified badge
  if (company.verified) {
    score += 10;
  }

  // Rating boost
  score += company.rating * 5;

  // Recency
  if (company.lastActiveDays !== undefined) {
    score -= company.lastActiveDays * 0.5;
  }

  // Budget compatibility
  if (parsed?.budgetLevel) {
    const minPrice = Math.min(
      ...company.services
        .filter((s) => s.fromPrice !== undefined)
        .map((s) => s.fromPrice!)
    );
    if (!isNaN(minPrice)) {
      if (parsed.budgetLevel === 'mic' && minPrice < 200) {
        score += 5;
      } else if (parsed.budgetLevel === 'mediu' && minPrice >= 200 && minPrice <= 500) {
        score += 5;
      } else if (parsed.budgetLevel === 'mare' && minPrice > 500) {
        score += 5;
      }
    }
  }

  return score;
};
