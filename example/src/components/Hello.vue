<template>
  <div class="hello">
    <vueker
      lang="es"
      format="DD/MM/YYYY"
      placeholder="Seleccione una fecha"
      init-date="20/12/2017"
      start-date="05/05/2016"
      end-date="13/08/2017"
      :sunday-at-the-end="true"
      :visible-dates="visibleDates"
    >
    </vueker>
  </div>
</template>

<script>
import Vueker from '../../../src/components/Vueker'

export default {
  name: 'hello',
  components:{Vueker},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      visibleDates: {
        mode:'enable',
        rules: {
          dates: [
            '19/06/2017',
            '20/07/2017',
            '25/07/2017',
            '02/08/2017'
          ],
          weekdays:[
            'sunday',
          ],
          ranges:[
            {from:'03/07/2017', to:'08/07/2017'},
            {from:'16/08/2017', to:'20/08/2017'},
          ]
        }
      },
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
