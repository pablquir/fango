<script lang="ts" setup>
let initSeconds = 3 * 60;
let { time, start, reset } = useStopwatch("regresivo", initSeconds);

let repeatTime: any = null;

onMounted(() => {
  start();
  repeatTime = setInterval(
    () => {
      reset();
      start();
    },
    (initSeconds + 2) * 1000,
  );
});

let isSlideOver = ref(false);

let iniciarViaje = () => {
  isSlideOver.value = false;
  console.log(isSlideOver.value);
};

onBeforeUnmount(() => {
  clearInterval(repeatTime);
});
</script>

<template>
  <div class="absolute w-full bottom-0 m-0 p-0 flex flex-col gap-4">
    <!-- boton ruta mostrar -->
    <div class="flex px-2 justify-end">
      <UButton
        icon="icon:shield-halved-solid-full"
        :ui="{
          leadingIcon: 'size-6',
        }"
        class="p-4 rounded-full bg-stone-950 fill-stone-100"
      />
    </div>
    <div class="flex justify-between w-full px-2">
      <UButton
        label="Ruta"
        icon="icon:route-solid-full"
        class="px-4 py-2 rounded-full fill-slate-100 bg-stone-950"
      />
      <USlideover
        v-model:open="isSlideOver"
        :overlay="false"
        side="bottom"
        class="text-md"
      >
        <UButton
          icon="icon:chevron-up-solid-full"
          label="Mostrar"
          class="px-4 py-2 rounded-full fill-slate-100 bg-stone-950"
        />

        <!-- menu expanded -->
        <template #content>
          <div
            class="flex flex-col rounded-t-3xl p-5 bg-stone-950 text-stone-100 gap-4"
          >
            <!-- mod 1 -->
            <div class="flex flex-col gap-2">
              <div class="flex justify-between font-bold text-2xl">
                <div>
                  <span class="border-3 py-1 px-3 rounded-2xl text-xl">1</span>
                  Esperando
                </div>
                <span>{{ time }}</span>
              </div>

              <div class="text-lg">Mons. Salvatierra, 408</div>
            </div>

            <USeparator />

            <!-- mod 2 -->
            <div class="flex flex-col gap-2">
              <div class="flex justify-between font-bold text-2xl">
                <div>
                  <span class="border-3 py-1 px-3 rounded-2xl text-xl">2</span>
                  Destino
                </div>
              </div>
              <div class="text-lg">Lilia Salvatierra, 4535</div>
            </div>

            <USeparator />

            <!-- mod 3 -->
            <div class="flex flex-col gap-4">
              <!-- opt1 -->
              <div class="flex justify-between">
                <div class="flex items-center fill-stone-100 gap-2">
                  <span class="border-3 py-1 px-2 rounded-2xl text-xl">
                    <Icon
                      name="icon:person-military-pointing-solid-full"
                      size="24"
                    />
                  </span>
                  Martha
                </div>
                <div class="flex fill-stone-100 gap-1 items-center">
                  <Icon name="icon:star-solid-full" size="24" />
                  4.5 / <Icon name="icon:taxi-solid-full" /> 300
                </div>
              </div>

              <!-- opt2 -->
              <div class="flex flex-col gap-2 text-stone-100 fill-stone-100">
                <!-- row 1 -->
                <div class="flex gap-2">
                  <UButton
                    class="flex flex-col flex-2 gap-4 bg-stone-500 rounded-xl p-2"
                  >
                    <div class="flex flex-1 w-full">
                      <span class="">Chat</span>
                    </div>
                    <div class="flex flex-1 justify-end w-full">
                      <Icon name="icon:comment-solid-full" size="30" />
                    </div>
                  </UButton>
                  <UButton
                    class="flex flex-col gap-4 flex-1 bg-stone-500 rounded-xl p-2"
                  >
                    <div class="flex flex-1 w-full">
                      <span>Llamar</span>
                    </div>
                    <div class="flex flex-1 justify-end w-full">
                      <Icon name="icon:phone-flip-solid-full" size="30" />
                    </div>
                  </UButton>
                </div>

                <!-- row 2 -->
                <UButton
                  class="flex flex-col p-2 gap-6 bg-blue-400 text-stone-900 rounded-xl"
                >
                  <div class="flex w-full gap-2 items-center">
                    <div
                      class="rounded-full p-2 bg-stone-950 fill-blue-400 flex justify-center items-center"
                    >
                      <Icon name="icon:coins-solid-full" size="24" />
                    </div>
                    <span>Metodo de pago</span>
                  </div>
                  <div class="w-full font-bold text-end text-xl">
                    Cobro en efectivo
                  </div>
                </UButton>

                <!-- row 3 -->
                <div class="flex gap-2 text-stone-100 fill-stone-100">
                  <UButton
                    class="flex flex-col gap-4 flex-1 rounded-xl bg-green-500 text-stone-900 fill-stone-900 p-2"
                  >
                    <div class="text-left text-lg w-full">Seguridad</div>
                    <div class="flex justify-end items-end w-full h-full">
                      <Icon name="icon:shield-halved-solid-full" size="36" />
                    </div>
                  </UButton>

                  <UButton
                    class="flex flex-col gap-4 flex-1 rounded-xl p-2 bg-stone-700"
                  >
                    <div class="w-full text-lg text-left">Navegador</div>
                    <div class="flex justify-end w-full h-full items-end">
                      <Icon name="icon:location-arrow-solid-full" size="36" />
                    </div>
                  </UButton>

                  <UButton
                    class="flex flex-col gap-4 flex-1 rounded-xl p-2 bg-stone-700"
                  >
                    <div class="w-full text-lg text-left">
                      Cancelar el viaje
                    </div>
                    <div class="flex justify-end w-full">
                      <Icon name="icon:ban-solid-full" size="36" />
                    </div>
                  </UButton>
                </div>
              </div>

              <!-- opt3 -->
              <SharedButtonSlide @initTravel="iniciarViaje" />
            </div>
          </div>
        </template>
      </USlideover>
    </div>

    <!-- Menu //////////////////// -->
    <div
      class="flex flex-col bg-stone-950 text-xl text-slate-100 rounded-t-4xl"
    >
      <div class="flex flex-col gap-2 p-4">
        <div class="flex justify-between font-bold">
          <div>
            <span class="border-3 py-1 px-3 rounded-xl">1</span>
            Esperando
          </div>
          <span>{{ time }}</span>
        </div>

        <div class="">Mons. Salvatierra, 408</div>
      </div>

      <USeparator class="p-0 m-0" />

      <div class="flex justify-around mt-2">
        <UButton
          class="flex flex-col fill-stone-100 text-stone-100"
          variant="ghost"
        >
          <Icon name="icon:location-arrow-solid-full" size="24" />
          <span>Pedidos</span>
        </UButton>
        <UButton
          class="flex flex-col fill-stone-500 text-stone-500"
          variant="ghost"
        >
          <Icon name="icon:wallet-solid-full" size="24" />
          <span>Dinero</span>
        </UButton>
        <UButton
          class="flex flex-col fill-stone-500 text-stone-500"
          variant="ghost"
        >
          <Icon name="icon:comment-solid-full" size="24" />
          <span>Chats</span>
        </UButton>
        <UButton
          class="flex flex-col fill-stone-500 text-stone-500"
          variant="ghost"
        >
          <Icon name="icon:location-arrow-solid-full" size="24" />
          <span>Perfil</span>
        </UButton>
      </div>
    </div>
  </div>
</template>
