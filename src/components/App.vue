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
          <h1 class="display-1"><span class="title-text"> {{word}}<br> - <br><span v-html="translated"></span> </span></h1>
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
          <learnedTable :learnedWords="learnedWords" :vocabulary="vocabulary"></learnedTable>
          </div>
        </div>
      </div>
    </div>

    <v-modal-simple id="welcome" VClass="modal-dialog modal-lg modal-dialog-centered">
      <h4 slot="subject">3000 оксфордских слов</h4>
      <div slot="body" class="alert alert-primary" role="alert">
        Оксфордский словарь имеет собственный список самых важных слов английского языка.
        В целом диапазон слов в словаре составляет 2500–3500 слов, которые покрывают от
        86% до 95% английской речи.
      </div>
    </v-modal-simple>

    <v-modal-simple id="info" VClass="modal-dialog modal-sm modal-dialog-centered">
      <h4 slot="subject">Статистика</h4>
      <div slot="body">
        <div class="p-3 mb-2 bg-success text-white">Выучено слов: {{learnedWords.length}}</div>
        <div class="p-3 mb-2 bg-primary text-white">Осталось выучить: {{vocabulary.length}}</div>
      </div>
    </v-modal-simple>

  </div>
</template>

<script>

  import fileVocabulary from '../assets/convertcsv';
  import learnedTable from './LearnedTable.vue';
  import modalSimple from './ModalSimple.vue';

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

    components: {
      learnedTable,
      "v-modal-simple": modalSimple,
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
