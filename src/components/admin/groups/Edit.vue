<script setup>
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { nanoid } from 'nanoid';

import Modal from '@/components/generic/Modal.vue';
import { useModal } from '@/composable/modal';
import ActionButton from '@/components/generic/ActionButton.vue';
import Button from '@/components/generic/Button.vue';
import TextField from '@/components/generic/TextField.vue';
import TextArea from '@/components/generic/TextArea.vue';
import Image from '@/components/admin/groups/edit/Image.vue';
// Icons
import IconClose from '~icons/uil/times';
import IconPencil from '~icons/lucide/pencil-line';
import IconMessage from '~icons/lucide/message-square-text';
import IconPlus from '~icons/lucide/plus';
import IconList from '~icons/lucide/clipboard-list';
import IconDrag from '~icons/mdi/drag-vertical';
import IconTrash from '~icons/lucide/trash';

const { isModalOpen, toggleModal } = useModal();
const db = getFirestore();

const props = defineProps({
  group: {
    type: [Object, null],
    required: true,
  },
});
const editGroup = ref(null);

const addTopic = () => {
  editGroup.value.topics.push({
    name: '',
    parentId: editGroup.value.id,
    id: `topic_${nanoid(15)}`,
  });
};

const updateGroup = async () => {
  if (!editGroup.value) return;
  const groupRef = doc(db, `questions/${editGroup.value.id}`);
  await setDoc(
    groupRef,
    {
      id: editGroup.value.id,
      name: editGroup.value.name,
      description: editGroup.value.description,
      imageUrl: editGroup.value.imageUrl,
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
  <Modal v-if="editGroup" :is-open="isModalOpen" :toggle-modal="toggleModal">
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
          Questions can belong to one or more topics, where each topic is part
          of a group. Groups can in theire place consist of multiple topics.
        </p>

        <p class="mt-1">
          <strong class="font-bold">For example. </strong>
          A group may be centered around a specific profession (Development).
          Within a profession-based group, topics represent different skills
          relevant to that profession. The group contains multiple topics such
          as "Javascript" "CSS" and "DevOps." Each topic would then contain
          questions relevant to that specific skill set.
        </p>
      </div>
      <div class="flex items-center justify-between gap-10">
        <div class="flex gap-2 items-center">
          <IconPencil class="w-5 text-app-primary" />
          <h4>Group name</h4>
        </div>
        <TextField
          v-model="editGroup.name"
          placeholder="Group name"
          size="md"
          elevation="none"
          class="w-1/2"
        />
      </div>
      <div class="flex flex-col justify-between gap-2">
        <div class="flex gap-2 items-center">
          <IconMessage class="w-5 text-app-primary" />
          <h4>Description</h4>
        </div>
        <TextArea
          v-model="editGroup.description"
          placeholder="Description of the group..."
          size="md"
          elevation="none"
        />
      </div>
      <Image
        v-model:imageUrl="editGroup.imageUrl"
        :image-location="`questions/topics/${editGroup.id}`"
      />
      <hr />
      <!-- Topics -->
      <div class="bg-app-body-bg rounded-lg border p-2 flex flex-col gap-2">
        <div class="flex items-center justify-between gap-10 px-2">
          <div class="flex gap-2 items-center">
            <IconList class="w-5 text-app-primary" />
            <h4>Topics</h4>
          </div>
          <button class="flex items-center" @click="addTopic">
            Add topic
            <IconPlus class="ms-2 w-6 h-6 text-app-primary" />
          </button>
        </div>
        <div
          v-for="topic in editGroup.topics"
          :key="topic.id"
          class="bg-white rounded-lg border py-2 pe-3 flex items-center"
        >
          <IconDrag class="w-8 h-8 text-app-primary" />
          <TextField
            v-model="topic.name"
            placeholder="Group name"
            elevation="none"
            size="md"
            class="flex-grow"
          />
          <button
            class="text-app-button-danger-bg ms-2 hover:text-app-button-danger-bg-focus"
          >
            <IconTrash class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal footer -->
    <div class="flex items-center justify-between px-5 pb-5 pt-2">
      <Button title="Delete group" size="md" type="danger" />
      <Button
        :title="group.id ? 'Change' : 'Create'"
        size="md"
        @click="updateGroup"
      />
    </div>
  </Modal>
</template>
