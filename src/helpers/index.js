export const convertMsToDate = (ms) => {
  const date = new Date(ms);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('pl', options);
};

const firebaseErrors = {
  'auth/invalid-email': 'Nieprawidłowy adres email.',
  'auth/user-not-found': 'Nie znaleziono użytkownika z takim e-mailem.',
  'auth/wrong-password': 'Niepoprawne hasło',
  'auth/email-already-in-use': 'Istnieje konto z takim adresem email.',
  'auth/weak-password': 'Hasło powinno zawierać min. 6 liter.',
  'pass-diff': 'Hasła powinny być takie same.',
  'auth/requires-recent-login': 'Żeby zmienić email/hasło musisz zalogować się ponownie.',
};

export const translateError = (code) =>
  Object.entries(firebaseErrors).filter(([key]) => key === code)[0][1];
