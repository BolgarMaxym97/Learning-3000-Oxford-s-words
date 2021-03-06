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

            <div class="input-group">
              <input class="form-control" v-model="searchWord"
                     placeholder="Найти слово">
              <div class="input-group-addon"><i class="fa fa-search"></i></div>
            </div>

            <table class="table table-striped">
              <thead class="">
              <tr>
                <th scope="col" class="sorting" data-sorted="default" @click="sorting($event, 'word', wordClass)">Слово
                  <i
                    class="fas" :class="wordClass"></i></th>
                <th scope="col" class="sorting" data-sorted="default"
                    @click="sorting($event, 'translated', translatedClass)">Перевод <i
                  class="fas" :class="translatedClass"></i></th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(translated, index) in learnedWordsRendered">
                <td>{{Object.keys(translated).join('')}}</td>
                <td>{{translated[Object.keys(translated).join('')]}}</td>
                <td>
                  <button type="button" class="btn btn-danger btn-sm waves-effect waves-light"
                          @click="removeFromLearned(index)"
                          v-tooltip="'Убрать слово из выученых'">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  <button type="button" class="btn btn-warning btn-sm waves-effect waves-light"
                          @click="play(index)"
                          v-tooltip="'Озвучить'">
                    <i class="fas fa-volume-up"></i>
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
      return {
        learnedWordsRendered: this.learnedWords,
        learnedWordsFixed: this.learnedWords,
        searchWord: '',
        wordClass: 'fa-sort',
        translatedClass: 'fa-sort'
      }
    },
    watch: {
      searchWord() {
        this.learnedWordsRendered = _.filter(this.learnedWordsFixed, item => {
          let index = Object.keys(item).join('');
          let value = item[index];
          return _.includes(index, this.searchWord) || _.includes(value, this.searchWord);
        });
      }
    },
    methods: {
      removeFromLearned(id) {
        this.vocabulary.push(Object.keys(this.learnedWordsRendered[id]).join(''));
        this.learnedWordsFixed.splice(id, 1);
        localStorage.setItem('vocabulary', JSON.stringify(this.vocabulary));
        localStorage.setItem('learnedWords', JSON.stringify(this.learnedWordsRendered));
        this.$emit('remove', this.learnedWordsRendered)
      },
      play(id) {
        responsiveVoice.speak(Object.keys(this.learnedWordsRendered[id]).join(''));
      },
      sorting(ev, column, className) {
        if (column === 'word') {
          this.translatedClass = 'fa-sort';
        } else {
          this.wordClass = 'fa-sort';
        }
        if (className === 'fa-sort') {
          this[column + 'Class'] = 'fa-sort-up';
          this.learnedWordsRendered = _.sortBy(this.learnedWordsRendered, item => {
            let index = Object.keys(item).join('');
            let value = item[index];
            return column === 'word' ? index : value;
          });

        } else if (className === 'fa-sort-up') {
          this[column + 'Class'] = 'fa-sort-down';
          this.learnedWordsRendered = this.learnedWordsRendered.reverse();
        } else {
          this[column + 'Class'] = 'fa-sort-up';
          this.learnedWordsRendered = this.learnedWordsRendered.reverse();
        }
      }
    },
  }
</script>

<style lang="scss">
  .sorting {
    cursor: pointer;
  }

  table {
    display: flex;
    flex-flow: column;
    max-height: 400px;
    width: 100%;
  }

  table thead {
    flex: 0 0 auto;
    width: 100%;
  }

  table tbody {
    flex: 1 1 auto;
    display: block;
    overflow-y: auto;
  }

  table tbody tr {
    width: 100%;
  }

  table thead, table tbody tr {
    display: table;
    table-layout: fixed;
  }

</style>
