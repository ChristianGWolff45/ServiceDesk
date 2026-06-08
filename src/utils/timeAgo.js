export function timeAgo(now, prev) {
  const then = new Date(prev);
  const diffms = now - then;
  const diffs = diffms / 1000;
  const diffmin = diffs / 60;
  const diffhrs = diffmin / 60;
  const diffdays = diffhrs / 24;
  if (diffdays > 1) {
    return `${Math.floor(diffdays)}d ago`;
  } else if (diffhrs > 1) {
    return `${Math.floor(diffhrs)}h ago`;
  } else if (diffmin > 1) {
    return `${Math.floor(diffmin)}m ago`;
  } else {
    return `now`;
  }
}
