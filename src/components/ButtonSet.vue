<script setup lang="ts">
import Button from 'primevue/button';

export interface Props {
  canResolve?: boolean;
  canRemove?: boolean;
  canEdit?: boolean;
  create?: boolean;
  edit?: boolean;
};

const props = defineProps<Props>();
</script>

<script lang="ts">
export default {
  emits: ['resolve', 'remove', 'edit', 'done']
}
</script>

<template>
  <div :class="{ 'p-buttonset': canEdit }">
    <Button
      v-if="create || edit"
      label="Done"
      icon="pi pi-save"
      size="small"
      @click="$emit('done')"
    />

    <Button
      v-if="canResolve && !create && !edit"
      label="Resolve"
      icon="pi pi-check"
      severity="success"
      size="small"
      @click="$emit('resolve')"
    />

    <Button
      v-if="canEdit && !create && !edit"
      label="Edit"
      icon="pi pi-pencil"
      size="small"
      @click="$emit('edit')"
    />

    <Button
      v-if="canRemove && !create"
      label="Remove"
      icon="pi pi-trash"
      severity="danger"
      size="small"
      @click="$emit('remove')"
    />
  </div>
</template>