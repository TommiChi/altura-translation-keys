import { defineEventHandler, getQuery } from 'h3';
import { http } from '~/services/http';

// This API route proxies the search request to the external backend
export default defineEventHandler(async (event) => {
  const { target } = getQuery(event) as { target: string | undefined };
  if (!target) {
    return { error: 'Missing query parameter' };
  }

  try {
    const result = await http(target);
    return result;
  } catch (error) {
    return { error: 'Failed to fetch from backend', details: error };
  }
});
