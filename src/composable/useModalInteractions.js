import { ref } from 'vue';

export default function useModalInteractions() {
  const isModalOpen = ref(false);

  const toggleModal = (isOpen) => {
    isModalOpen.value = isOpen;
  };

  return {
    isModalOpen,
    toggleModal,
  };
}
