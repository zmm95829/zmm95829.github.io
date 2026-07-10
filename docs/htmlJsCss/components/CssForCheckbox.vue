<template>
  <label class="checkbox">
    <input type="checkbox" />
    <span>同意本协议</span>
  </label>
</template>

<script setup>
</script>

<style scoped>
    .checkbox {
      --active-color: #579ef8;
      position: relative;
      padding-left: 1.5em;
      cursor: pointer;
    }
    .checkbox input {
      display: none;
    }
    .checkbox span {
      display: inline-block;
      user-select: none;
    }
    .checkbox span::before,
    .checkbox span::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 1em;
      height: 1em;
      position: absolute;
      left: 0;
      top: 50%;
      border-radius: 3px;
      border: 1px solid;
      transform: translateY(-50%);
    }
    .checkbox span::before {
      border-color: #ccc;
    }
    .checkbox span::after {
      width: 0.6em;
      height: 0.6em;
      left: 0.2em;
      background-color: var(--active-color);
      border-color: var(--active-color);
      opacity: 0;
    }
    .checkbox input:checked ~ span {
      color: var(--active-color);
    }
    .checkbox input:checked ~ span::after {
      opacity: 1;
    }
    .checkbox input:checked ~ span::before {
      border-color: var(--active-color);
    }
</style>