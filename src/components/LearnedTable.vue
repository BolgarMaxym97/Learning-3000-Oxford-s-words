<template>
  <div id="learned-table">
    <button v-tooltip="'Посмотерть все выученые слова'" type="button"
            data-toggle="modal" data-target="#myModal"
            class="btn btn-primary waves-effect waves-light btn-xlg btn-block">
      Выученые слова
    </button>
    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Выученые слова</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <table class="table table-striped dataTable">
              <thead class="">
              <tr>
                <th scope="col">Слово</th>
                <th scope="col">Перевод</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(translated, index) in learnedWords">
                <td>{{Object.keys(translated).join('')}}</td>
                <td>{{translated[Object.keys(translated).join('')]}}</td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm waves-effect waves-light"
                          @click="removeFromLearned(index)"
                          v-tooltip="'Убрать слово из выученых'">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger waves-effect waves-light" data-dismiss="modal">Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'learned-table',
    props: ['learnedWords', 'vocabulary'],
    data() {
      return {}
    },
    methods: {
      removeFromLearned: function (id) {
        this.vocabulary.push(Object.keys(this.learnedWords[id]).join(''));
        this.learnedWords.splice(id, 1);
        localStorage.setItem('vocabulary', JSON.stringify(this.vocabulary));
        localStorage.setItem('learnedWords', JSON.stringify(this.learnedWords));

      },
    },
  }
</script>

<style lang="scss">
  .dataTables_scrollHeadInner {
    width: 95% !important;
  }

  .dataTables_scrollHeadInner table {
    width: 95% !important;
  }
</style>
