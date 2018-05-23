<template>
  <div id="app" class="h-100" style="position: relative">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="topcorner">
          <button @click="showInfo" class="btn btn-info waves-effect waves-light btn-sm">
            <i class="fas fa-info-circle"></i>
          </button>
        </div>
        <div class="col-md-12">
          <h1 class="display-1"><span class="title-text"> {{word}} - <span v-html="translated"></span> </span></h1>
          <button v-tooltip="okText" type="button"
                  @click="learned"
                  class="btn btn-success waves-effect waves-light btn-xlg btn-block">
            Выучено
          </button>
          <button v-tooltip.bottom="cancelText" type="button"
                  @click="next"
                  class="btn btn-danger waves-effect waves-light btn-xlg btn-block">
            Пропустить
          </button>
        </div>
        <div class="row">
          <div class="col-md-12">
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

            <div class="modal" id="welcome">
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">3000 оксфордских слов</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <!-- Modal body -->
                  <div class="modal-body">
                    <div class="alert alert-primary" role="alert">
                      Оксфордский словарь имеет собственный список самых важных слов английского языка.
                      В целом диапазон слов в словаре составляет 2500–3500 слов, которые покрывают от
                      86% до 95% английской речи.
                    </div>
                  </div>
                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect waves-light" data-dismiss="modal">Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal" id="info">
              <div class="modal-dialog modal-sm modal-dialog-centered">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">Статистика</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <!-- Modal body -->
                  <div class="modal-body">
                    <div class="p-3 mb-2 bg-success text-white">Выучено слов: {{learnedWords.length}}</div>
                    <div class="p-3 mb-2 bg-primary text-white">Осталось выучить: {{vocabulary.length}}</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import fileVocabulary from './assets/convertcsv';

  export default {
    name: 'app',
    data() {
      return {
        word: '---',
        translated: '<i class="fas fa-spinner"></i>',
        vocabulary: [],
        learnedWords: [],
        okText: 'При нажатии на эту кнопку данное слово больше не будет Вам показано и запишеться в "Выученые"',
        cancelText: 'При нажатии на эту кнопку Вы пропустите это слово и оно Вам будет показано позже в случайном порядке',
      }
    },

    created: function () {
      let fileVocabularyStorage = JSON.parse(localStorage.getItem('vocabulary'));
      this.learnedWords = JSON.parse(localStorage.getItem('learnedWords')) || [];
      if (fileVocabularyStorage) {
        this.vocabulary = fileVocabularyStorage;
      } else {
        localStorage.setItem('vocabulary', JSON.stringify(fileVocabulary));
        this.vocabulary = fileVocabulary;
      }
      this.word = _.sample(this.vocabulary);
      this.translate(this.word);
    },

    methods: {
      translate: function (sourceText) {
        $.post('https://translate.yandex.net/api/v1.5/tr.json/translate?lang=en-ru&key=trnsl.1.1.20180522T115145Z.f4b2ddcb7743cad5.df843115c2d9508d95ba4e901f8a873a302ef2e2', {
          text: sourceText
        }).done((response) => this.translated = response.text.join(' '));
      },

      learned: function () {
        this.learnedWords.push({[this.word]: this.translated});
        this.vocabulary = this.vocabulary.filter(word => word !== this.word);
        localStorage.setItem('vocabulary', JSON.stringify(this.vocabulary));
        localStorage.setItem('learnedWords', JSON.stringify(this.learnedWords));
        return this.next();
      },

      next: function () {
        this.translated = '<i class="fas fa-spinner"></i>';
        this.word = _.sample(this.vocabulary);
        this.translate(this.word);
      },

      removeFromLearned: function (id) {
        this.vocabulary.push(Object.keys(this.learnedWords[id]).join(''));
        this.learnedWords.pop(id);
        localStorage.setItem('vocabulary', JSON.stringify(this.vocabulary));
        localStorage.setItem('learnedWords', JSON.stringify(this.learnedWords));

      },

      showInfo: function () {
        $('#info').modal('show');
      },
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .display-1 {
    font-size: 6em;
  }

  .big-text {
    font-size: 5em;
  }

  .topcorner {
    position: absolute;
    top: 25px;
    right: 25px;
  }

  .fa-info-circle {
    font-size: 22px !important;
  }
</style>
