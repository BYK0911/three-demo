<template>
  <div class="home">
    <ul>
      <li>
        <router-link :to='{ path: "/boot" }'>Getting started</router-link>
      </li>
      <li>
        <router-link :to='{ path: "/parametric" }'>Parametric Geometry</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
