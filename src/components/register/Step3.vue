<script setup>
defineProps({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <table
    class="w-full text-left bg-white rounded-lg border-primary border-t-4 shadow-md"
  >
    <tbody>
      <tr>
        <td class="w-fit p-4">Name:</td>
        <td class="p-4 text-end font-bold">{{ firstName }} {{ lastName }}</td>
      </tr>
      <tr>
        <td class="w-fit p-4">Email:</td>
        <td class="p-4 text-end font-bold">{{ email }}</td>
      </tr>
      <tr>
        <td class="w-fit p-4">Position:</td>
        <td class="p-4 text-end font-bold">{{ position }}</td>
      </tr>
    </tbody>
  </table>
</template>
