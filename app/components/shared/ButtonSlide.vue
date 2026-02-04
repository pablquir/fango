<script lang="ts" setup>
let emit = defineEmits<{
  initTravel: void | any;
}>();

let result = ref();

const container: any = ref(null);

const startX = ref(0);
const width = ref<any>("auto");
const isDragging = ref(false);
let completed = ref(false);

const onPointerDown = (e: PointerEvent) => {
  if (completed.value) return;
  isDragging.value = true;
  startX.value = e.clientX;
};

const onPointerMove = (e: PointerEvent) => {
  result.value = e.clientX;
  if (!isDragging.value || !container.value) return;

  const delta = e.clientX - startX.value;
  const maxWidth = container.value.clientWidth;

  width.value = Math.min(Math.max(56, delta + 56), maxWidth - 20);
};

const onPointerUp = () => {
  console.log("up");
  if (!container.value) return;
  const maxWidth = container.value.clientWidth - 20;
  if (width.value >= maxWidth * 0.95) {
    width.value = maxWidth;
    completed.value = true;
    iniciarViaje();
  } else {
    width.value = 56;
  }

  isDragging.value = false;
};

const iniciarViaje = () => {
  setTimeout(() => {
    audio?.play();
    emit("initTravel");
  }, 1000);
};

let audio: HTMLAudioElement | null = null;

onMounted(() => {
  audio = new Audio("/fango-audio.opus");
});
</script>

<template>
  <div class="flex flex-col">
    <!-- <div>{{ result }}</div> -->
    <Button
      ref="container"
      class="grid touch-none relative text-yellow-400 bg-stone-700 p-2 rounded-full text-xl font-bold"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    >
      <div
        class="z-1 redondo flex justify-self-start justify-end p-4 bg-yellow-400 rounded-full"
        :style="{ width: `${width}px` }"
        @pointerdown="onPointerDown"
      >
        <Icon
          v-if="!completed"
          name="icon:arrow-right-solid-full"
          class="fill-stone-950"
          size="24"
        />
        <Icon
          v-else
          name="icon:check-solid-full"
          class="fill-stone-950"
          size="24"
        />
      </div>
      <span
        class="absolute h-full w-full text-xl flex justify-center items-center"
        >Comenzar viaje</span
      >
    </Button>
  </div>
</template>
