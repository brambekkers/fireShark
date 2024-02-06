export const useLayoutStore = defineStore('layout', () => {
  const isDarkMode = ref(false);

  return { isDarkMode };
});

export default useLayoutStore;
