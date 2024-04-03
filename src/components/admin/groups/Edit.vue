<script setup>
import { doc, setDoc, getFirestore, deleteDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';

// Composables
import { useImage } from '@/composable/image';
import { useModal } from '@/composable/modal';

// Components
import Modal from '@/components/generic/Modal.vue';
import ActionButton from '@/components/generic/ActionButton.vue';
import Button from '@/components/generic/Button.vue';
import Name from '@/components/admin/groups/edit/Name.vue';
import Description from '@/components/admin/groups/edit/Description.vue';
import Image from '@/components/admin/groups/edit/Image.vue';
import Topics from '@/components/admin/groups/edit/Topics.vue';

// Icons
import IconClose from '~icons/uil/times';

const { isModalOpen, toggleModal } = useModal();
const db = getFirestore();

const props = defineProps({
  group: {
    type: Object,
    required: false,
    default: () => null,
  },
});
const editGroup = ref(null);

const updateGroup = async (skipClose = false) => {
  if (!editGroup.value) return;
  const groupRef = doc(db, `questions/${editGroup.value.id}`);
  await setDoc(
    groupRef,
    {
      id: editGroup.value.id,
      name: editGroup.value.name,
      description: editGroup.value.description,
      imageUrl: editGroup.value.imageUrl,
      imageRef: editGroup.value.imageRef,
      questionAmount: editGroup.value.questionAmount,
      userAmount: editGroup.value.userAmount,
      topics: editGroup.value.topics.map((topic) =>
        doc(db, `questions/${editGroup.value.id}/topics/${topic.id}`),
      ),
    },
    { merge: true },
  );

  if (editGroup.value.topics?.length) {
    editGroup.value.topics.forEach((topic) => {
      const topicRef = doc(
        db,
        `questions/${editGroup.value.id}/topics/${topic.id}`,
      );
      setDoc(topicRef, topic);
    });
  }

  if (skipClose) return;
  toggleModal();
};

const deleteGroup = async () => {
  const parentId = editGroup.value.id;
  // Delete sub topics
  props.group.topics.forEach((topic) => {
    const topicRef = doc(db, `questions/${parentId}/topics/${topic.id}`);
    deleteDoc(topicRef);
  });

  // Delete image
  if (editGroup.value.imageRef) {
    const { deletePicture } = useImage(editGroup.value.imageRef);
    deletePicture();
    editGroup.value.imageUrl = null;
    editGroup.value.imageRef = null;
  }

  // Delete the group
  const groupRef = doc(db, `questions/${parentId}`);
  deleteDoc(groupRef);

  toggleModal();
};

watch(isModalOpen, (modalOpen) => {
  if (!modalOpen) {
    editGroup.value = null;
  }
});

watch(
  () => props.group,
  (newGroup) => {
    if (newGroup) {
      editGroup.value = { ...newGroup };
      if (!newGroup.id) {
        editGroup.value.id = `group_${nanoid(15)}`;
      }
      toggleModal();
    }
  },
);
</script>

<template>
  <Modal v-if="editGroup" :is-open="isModalOpen" width="5xl">
    <!-- Modal header -->
    <div class="flex items-center justify-between p-5">
      <h3 class="text-xl font-semibold">
        {{ group.id ? 'Edit' : 'Create' }} group
      </h3>
      <ActionButton @click="toggleModal()">
        <IconClose class="h-6 w-6" />
      </ActionButton>
    </div>
    <!-- Modal body -->
    <div class="px-5 py-2 space-y-4 w-full">
      <!-- Groups -->
      <div
        class="bg-primary/10 border border-primary px-4 py-3 rounded relative text-sm"
        role="alert"
      >
        <p>
          <strong class="font-bold">Explanation: </strong><br />
          Questions can belong to one or more topics, where each topic is part
          of a group. Groups can in theire place consist of multiple topics.
        </p>

        <p class="mt-1">
          <strong class="font-medium">For example: </strong>
          A group may be centered around a specific profession (Development).
          Within a profession-based group, topics represent different skills
          relevant to that profession. The group contains multiple topics such
          as "Javascript" "CSS" and "DevOps." Each topic would then contain
          questions relevant to that specific skill set.
        </p>
      </div>
      <Name v-model:name="editGroup.name" />
      <Description v-model:description="editGroup.description" />
      <Image
        v-model:imageUrl="editGroup.imageUrl"
        v-model:imageRef="editGroup.imageRef"
        :image-location="`groups/topics/${editGroup.id}`"
        @update="updateGroup(true)"
      />
      <hr />
      <!-- Topics -->
      <Topics v-model:topics="editGroup.topics" :parent-id="editGroup.id" />
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-between px-5 pb-5 pt-2">
      <Button
        title="Delete group"
        size="md"
        type="danger"
        @click="deleteGroup"
      />
      <Button
        :title="group.id ? 'Change' : 'Create'"
        size="md"
        @click="updateGroup"
      />
    </div>
  </Modal>
</template>
