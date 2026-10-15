// The entries remain readable in talks.html without JavaScript.
// Each .talk-record supplies date, title, region, format(s), and selection status.
(() => {
  const list = document.getElementById('talk-list');
  const controls = document.getElementById('talk-controls');
  const field = document.getElementById('talk-sort');
  const order = document.getElementById('talk-order');
  const region = document.getElementById('talk-region');
  const format = document.getElementById('talk-format');
  const reset = document.getElementById('talk-reset');
  const empty = document.getElementById('talk-empty');
  const count = document.querySelector('.talk-count');
  if (!list || !controls || !field || !order || !region || !format || !reset) return;

  const japanese = document.documentElement.lang === 'ja';
  let descending = true;

  function matches(row) {
    if (region.value !== 'all' && row.dataset.region !== region.value) return false;
    if (format.value === 'all') return true;
    if (format.value === 'selected-talk') return row.dataset.selectedTalk === 'true';
    return (row.dataset.formats || '').split(' ').includes(format.value);
  }

  function updateTalks() {
    const rows = Array.from(list.querySelectorAll('.talk-record'));
    const key = field.value;
    rows.sort((a, b) => {
      const first = a.dataset[key] || '';
      const second = b.dataset[key] || '';
      const comparison = key === 'date'
        ? first.localeCompare(second)
        : first.localeCompare(second, japanese ? 'ja' : 'en', { sensitivity: 'base' });
      return descending ? -comparison : comparison;
    });

    let visible = 0;
    rows.forEach(row => {
      row.hidden = !matches(row);
      if (!row.hidden) visible += 1;
      list.appendChild(row);
    });
    list.scrollTop = 0;
    order.textContent = descending ? '↓' : '↑';
    order.setAttribute('aria-label', japanese
      ? (descending ? '降順' : '昇順')
      : (descending ? 'Descending order' : 'Ascending order'));
    if (count) count.textContent = japanese
      ? `${rows.length}件中${visible}件を表示`
      : `Showing ${visible} of ${rows.length} presentations`;
    if (empty) empty.hidden = visible !== 0;
  }

  field.addEventListener('change', updateTalks);
  region.addEventListener('change', updateTalks);
  format.addEventListener('change', updateTalks);
  order.addEventListener('click', () => {
    descending = !descending;
    updateTalks();
  });
  reset.addEventListener('click', () => {
    field.value = 'date';
    region.value = 'all';
    format.value = 'all';
    descending = true;
    updateTalks();
  });
  controls.hidden = false;
  updateTalks();
})();
