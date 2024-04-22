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
    link: '/admin',
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
  <ul
    class="flex flex-row md:flex-col justify-center space-x-2 md:space-x-0 md:space-y-2 font-medium px-4 w-full"
  >
    <li v-for="item of menuItems" :key="item.title" class="flex-grow">
      <router-link
        :to="item.link"
        class="transition-all flex flex-col md:flex-row justify-center bg-app-primary sm:bg-transparent md:justify-start items-center px-3 py-4 border-app-primary text-white rounded-lg hover:bg-app-primary group hover:scale-105"
      >
        <component :is="item.icon" class="min-w-5 text-app-warning" />
        <span
          class="hidden sm:block mt-1 md:mt-0 md:ms-3 font-light group-hover:font-semibold group-hover:text-white"
        >
          {{ item.title }}
        </span>
      </router-link>
    </li>
  </ul>
</template>
