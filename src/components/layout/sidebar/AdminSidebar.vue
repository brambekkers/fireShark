<script setup>
import IconPieChart from '~icons/lucide/pie-chart';
import IconUsers from '~icons/lucide/users';
import IconRoute from '~icons/lucide/route';
import IconSettings from '~icons/lucide/settings';
import IconFiles from '~icons/lucide/files';

const menuItems = shallowRef([
  {
    title: 'Dashboard',
    icon: IconPieChart,
    link: '/admin/dashboard',
  },
  {
    title: 'Groups',
    icon: IconRoute,
    link: '/admin/groups',
  },
  {
    title: 'Questions',
    icon: IconFiles,
    link: '/admin/questions',
  },
  {
    title: 'Users',
    icon: IconUsers,
    link: '/admin/users',
  },
  {
    title: 'Settings',
    icon: IconSettings,
    link: '/admin/settings',
  },
]);
</script>

<template>
  <ul class="space-y-2 font-medium px-4">
    <li v-for="item of menuItems" :key="item.title">
      <router-link
        :to="item.link"
        class="transition-all flex items-center px-3 py-4 border-app-primary text-white rounded-lg hover:bg-app-primary group hover:scale-105"
      >
        <component :is="item.icon" class="w-5 text-app-warning" />
        <span
          class="ms-3 font-light group-hover:font-semibold group-hover:text-white"
        >
          {{ item.title }}
        </span>
      </router-link>
    </li>
  </ul>
</template>
