<template>
  <div class="add-new"><h1>Add new timer</h1>
  <div class="form-group">
    <label for="new-title">Title</label>

    <input id="new-title" class="form-control"
           autofocus autocomplete="off"
           placeholder="What do you want to track?"
           v-model="title">
  </div>
  <div class="form-group">
    <label for="new-color">Color </label>

    <input type="color" id="new-color" class="form-control"
           v-model="color">
  </div>
  <div class="form-group">
    <label for="new-type">Type</label>
    <select id="new-type" v-model="type" class="form-control">
    </select>
  </div>
  <div class="form-group" v-if="isToggle">
    <label for="new-val1">Odd value</label>
    <input id="new-val1" class="form-control" v-model="value1">
    <label for="new-val2">Even value</label>
    <input id="new-val2" class="form-control" v-model="value2">
  </div>
  </div>
</template>

<script>
  import TypesMixin from '@/components/TypesMixin.js';

  export default {
    name: "add",
    props: {
      title: String,
      type: String,
      value1: String,
      value2: String,
      color: String,
    },
    mixin: [TypesMixin]
  };
</script>
