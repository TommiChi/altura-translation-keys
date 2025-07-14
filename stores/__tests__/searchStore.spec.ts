import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSearchStore } from '../searchStore';

vi.mock('~/services/http', () => ({
  http: vi.fn(() => Promise.resolve({ data: [] }))
}));

describe('useSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default values', () => {
    const store = useSearchStore();
    expect(store.currentPage).toBe(0);
    expect(store.results.length).toBe(0);
    expect(store.resultsPerPage).toBeNull();
  });

  it('sets pagination size', async () => {
    const store = useSearchStore();
    await store.setPaginationSize(10);
    expect(store.resultsPerPage).toBe(10);
  });

  it('updates date filter with valid date', () => {
    const store = useSearchStore();
    store.updateDateFilter('start', '14-07-2025');
    expect(store.dateFilter.start).toContain('2025-07-14T00:00:01.000Z');
  });

  it('clears date filter with invalid date', () => {
    const store = useSearchStore();
    store.updateDateFilter('start', 'invalid-date');
    expect(store.dateFilter.start).toBe('');
  });

  it('updates current page within bounds', () => {
    const store = useSearchStore();
    store.currentPage = 1;
    store.updateCurrentPage(1);
    // Should not increment if totalPages is 1
    expect(store.currentPage).toBe(1);
  });

  it('calls apiSearch and updates results', async () => {
    const store = useSearchStore();
    await store.apiSearch('test');
    expect(store.results).toEqual([]);
  });
});
