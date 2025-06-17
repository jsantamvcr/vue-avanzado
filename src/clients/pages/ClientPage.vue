<script setup lang="ts">

import LoadingModal from '@/shared/components/LoadingModal.vue';
</script>

<template>
  <h3>Guardando ...</h3>
  <h3>Guardado</h3>


  <LoadingModal v-if="false"/>

  <div>
    <h1>Juan Carlos Santamaria</h1>

    <!--    //client form-->
    <form action="">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" value="Juan Carlos Santamaria">
        <br>
        <label for="address">Address</label>
        <input type="text" id="address" name="address" value="Juan Carlos Santamaria">
      </div>

      <button type="submit">Save</button>

    </form>
  </div>

  <hr>

  <code>
    all info client
  </code>

</template>

<style scoped>

input {
  width: 100%;
  margin-bottom: 16px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  background-color: hsla(160, 100%, 37%, 0.2);
  color: var(--color-text);
}

button {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  margin-right: 5px;
  cursor: pointer;
  transition: all 0.5s;
}

button:hover {
  background-color: hsla(160, 100%, 37%, 0.2);
  transition: all 0.5s;
}

code  {
  display: block;
  padding: 10px;
  background-color: var(--color-background-soft);
  border-radius: 5px;
  margin-top: 10px;
}
</style>