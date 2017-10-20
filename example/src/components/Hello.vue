<template>
  <div class="hello">
    <vueker
      lang="es"
      format="DD/MM/YYYY"
      placeholder="Seleccione una fecha"
      init-date="20/07/2017"
      min-date="13/06/2017"
      max-date="04/08/2017"
      :sunday-at-the-end="true"
    >
    </vueker>
  </div>
</template>

<script>
import Vueker from './Vueker'

export default {
  name: 'hello',
  components:{Vueker},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.hello {
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
