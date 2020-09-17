const baseURL = () => {
  return new URL('https://www.reddit.com');
}

export function availableEnums() {
  return ['PagesEnum', 'SortingEnum', 'TimeframeEnum', 'CommentSortEnum'];
}

export const PagesEnum = {
  Best: {
    name: 'best',
    is_subreddit: false
  },
  Top: {
    name: 'top',
    is_subreddit: false
  },
  Hot: {
    name: 'hot',
    is_subreddit: false
  },
  All: {
    name: 'all',
    is_subreddit: true
  }
}
export const SortingEnum = {
  Hot: 'hot',
  New: 'new',
  Rising: 'rising',
  Top: 'top',
  None: undefined
}
export const TimeframeEnum = {
  Now: 'hour',
  Today: 'day',
  ThisWeek: 'week',
  ThisMonth: 'month',
  ThisYear: 'year',
  AllTime: 'all',
  None: undefined,
}

export const CommentSortEnum = {
  Best: 'confidence',
  Top: 'top',
  New: 'new',
  Controversial: 'controversial',
  Old: 'old',
  Random: 'random',
  QuestionAndAnswer: 'qa',
}

export async function trendingSubreddits() {
  return await (await fetch(`${baseURL}/api/trending_subreddits.json`))
    .json()
}

export async function subreddit(
  {
    page = PagesEnum.All,
    sorting = SortingEnum.None,
    filters: {
      timeframe = TimeframeEnum.None,
      after = undefined,
      before = undefined,
      limit = 25,
      count = undefined,
    } = {}

  } = {}) {

  let base = baseURL();
  if (page.is_subreddit) base = new URL('/r/', base);
  base = new URL(page.name, base);
  if (sorting !== SortingEnum.None && page.is_subreddit) base = new URL(`${base.pathname}/${sorting}`, base);

  base.pathname += '.json';

  if (timeframe) base.searchParams.append('t', timeframe);
  if (after) base.searchParams.append('after', after);
  if (before) base.searchParams.append('before', before);
  if (limit) base.searchParams.append('limit', limit.toString());
  if (count) base.searchParams.append('count', count);

  return await (await fetch(base.href)).json()
}

export async function comments(
  {
    page = PagesEnum.Top,
    post_id = undefined,
    filters: {
      limit = undefined,
      depth = undefined,
      sort = CommentSortEnum.Top
    } = {}

  } = {}) {
  if (post_id === undefined) {
    throw `comments called with no post_id set`;
  }

  let base = baseURL();
  if (page.is_subreddit) base = new URL('/r/', base);
  base = new URL(`${page.name}/comments/${post_id}.json`, base);

  if (limit) base.searchParams.append('limit', limit);
  if (depth) base.searchParams.append('depth', depth);
  if (sort) base.searchParams.append('sort', sort);

  return await (await fetch(base.href)).json()
}
