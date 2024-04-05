export const useModal = () => {
  const isModalOpen = ref(false);

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  };

  return {
    isModalOpen,
    toggleModal,
  };
};

export default useModal;
