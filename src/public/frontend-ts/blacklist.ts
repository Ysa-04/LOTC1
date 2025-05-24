document.addEventListener('DOMContentLoaded', () => {
  const removeButtons = document.querySelectorAll<HTMLButtonElement>('.remove-blacklist');
  const updateButtons = document.querySelectorAll<HTMLButtonElement>('.update-blacklist');

  removeButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const quote = button.dataset.quote;
      if (!quote) return;

      await fetch('/user/blacklist/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote })
      });

      window.location.reload();
    });
  });

  updateButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const quote = button.dataset.quote;
      if (!quote) return;
      const newReason = prompt('Nieuwe reden voor blacklist:');
      if (!newReason) return;

      await fetch('/user/blacklist/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quote, reason: newReason })
      });

      window.location.reload();
    });
  });
});
