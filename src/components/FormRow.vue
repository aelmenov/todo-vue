<script setup lang="ts">
export interface Props {
  label: string
  forId?: string
  hasInput?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'p-float-label': hasInput,
      'mb-7': hasInput,
      'mx-3': !hasInput,
      'mb-2': !hasInput
    }"
  >
    <span v-if="!hasInput" class="font-bold"> {{ label }}: </span>

    <slot></slot>

    <label v-if="hasInput" :for="forId">
      {{ label }}
    </label>
  </div>
</template>
