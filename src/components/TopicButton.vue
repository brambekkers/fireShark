<script setup>
import { ref } from 'vue';
const checkbox = ref(null);
const test = ref(false);
defineProps({
    title: String,
    progress: Number,
});
</script>

<template>
    <div
        class="shadow-xl cursor-pointer transition-all duration-500 hover:shadow-2xl"
        @click="checkbox.click()"
    >
        <!-- header -->
        <div class="flex relative">
            <!-- background -->
            <div class="bg-white rounded-tl-2xl min-h-6 flex-1"></div>
            <div class="min-h-6 min-w-6"></div>
            <div class="bg-white rounded-tr-2xl min-h-6 flex-1"></div>

            <!-- check circle -->
            <div
                class="circle bg-slate-400 min-h-6 min-w-6 absolute z-10 rounded-full"
            />
        </div>
        <!-- Title -->
        <div class="bg-white px-12 py-8 rounded-b-2xl">
            <input
                v-model="test"
                class="hidden"
                ref="checkbox"
                type="checkbox"
            />
            <h3 class="text-xl text-center font-bold text-primary">
                {{ title }} {{ test ? 'on' : 'off' }}
            </h3>
            <div class="mt-6 h-2 rounded bg-slate-200 relative overflow-hidden">
                <div
                    :style="{ width: progress + '%' }"
                    class="from-primary to-secondary bg-gradient-to-r h-full"
                ></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.circle {
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
