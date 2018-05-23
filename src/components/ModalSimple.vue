<template>
  <div class="modal" :id="id">
    <div :class="VClass">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <slot name="subject"></slot>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger waves-effect waves-light" data-dismiss="modal">Закрыть
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
    }
  }
</script>

<style lang="scss">

</style>
