<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="toHome" class="abc">
        Back Home
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: 'Exception404',
  methods: {
    toHome() {
      this.$router.push({ path: '/' })
    }
  },
  mounted() {
    // document.body.style.setProperty('--maxin-color', 'blue')
    const arr = [1, 1, 2, 3, 4, 5, 6, 7, 7, 8, 4, 0, 0, 3]
    // const newArr = arr.filter((item, index) => {
    //   return arr.indexOf(item) === index
    // })
    const newArr = []

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index]
      let hasOne = true
      for (let i = index + 1; i < arr.length; i++) {
        if (arr[index] == arr[i]) {
          hasOne = false
        }
      }
      if (hasOne) {
        newArr.push(element)
      }
    }
    console.log(newArr)
  }
}
</script>
<style>
/* :root {
  --maxin-color: coral;
}
.abc {
  color: var(--maxin-color);
} */
</style>
