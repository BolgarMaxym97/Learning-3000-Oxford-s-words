<template>
  <div class="modal" :id="id" :class="{hide: hidden}">
    <div :class="VClass">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <slot name="subject"></slot>
          <button type="button" class="close" @click="hidden = true" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" @click="hidden = true" class="btn btn-danger waves-effect waves-light"
                  data-dismiss="modal">Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      id: {
        required: true,
        type: String
      },
      VClass: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        hidden: false
      }
    }
  }
</script>

<style lang="scss">
  .hide {
    display: none;
  }
</style>
