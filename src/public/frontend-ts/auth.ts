document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password') as HTMLInputElement | null;
  const togglePasswordBtn = document.getElementById('toggle-password') as HTMLButtonElement | null;

  togglePasswordBtn?.addEventListener('click', () => {
    if (!passwordInput) return;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    togglePasswordBtn.textContent = passwordInput.type === 'password' ? 'Toon' : 'Verberg';
  });
});
