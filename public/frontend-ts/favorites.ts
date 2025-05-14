document.addEventListener('DOMContentLoaded', () => {
  const removeButtons = document.querySelectorAll<HTMLButtonElement>('.remove-favorite');

  removeButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const quote = button.dataset.quote;
      if (!quote) return;

      await fetch('/user/favorite/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote })
      });

      window.location.reload();
    });
  });

  const exportBtn = document.getElementById('export-btn') as HTMLButtonElement | null;

  exportBtn?.addEventListener('click', () => {
    const quotes = document.querySelectorAll<HTMLElement>('.quote-entry');
    let content = '';
    quotes.forEach(el => {
      const quote = el.dataset.quote;
      const character = el.dataset.character;
      if (quote && character) content += `${quote} - ${character}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'favorites.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
});
