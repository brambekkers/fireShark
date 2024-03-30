export const useModal = () => {
  const isModalOpen = ref(false);

  const toggleModal = (forceToggle) => {
    isModalOpen.value = forceToggle ?? !isModalOpen.value;
  };

  return {
    isModalOpen,
    toggleModal,
  };
};

export default useModal;
