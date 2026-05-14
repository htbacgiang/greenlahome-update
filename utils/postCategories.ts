/**
 * Normalize post category - đảm bảo category hợp lệ
 */
export const normalizePostCategory = (category: string | undefined | null): string => {
  if (!category || typeof category !== 'string') return '';
  return category.trim();
};

export const POST_CATEGORIES = [
  'Tin tức',
  'Thiết kế nội thất',
  'Phong thủy',
  'Mẹo hay',
  'Xu hướng',
  'Khác',
];
