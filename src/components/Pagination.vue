<template>
  <paginate
    :page-count="this.pageCount"
    :click-handler="swapPage"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'flex-content pagination-container'"
    :page-class="'page-item'"
    :prev-class="'page-item'"
    :next-class="'page-item'"
    :active-class="'active-page-item'"
  >
  </paginate>
</template>

<script>
import Paginate from 'vuejs-paginate'
export default {
  name: 'Pagination',
  data() {
    return {}
  },
  components: {
    Paginate,
  },
  props: {
    rowsPerPage: { type: Number },
    pageCount: { type: Number },
  },
  methods: {
    swapPage(page) {
      console.log(page)
      this.$emit('updatePage', page)
    },
  },
  computed: {
    products() {
      return this.$store.state.products
    },
  },
}
</script>

<style lang="scss">
.pagination-container {
  margin-top: 20px;
}
.page-item {
  padding: 5px 10px;
  color: #aaa;
  transition: 0.3s;
  user-select: none;
  &:hover {
    color: #fff;
  }
}
.active-page-item {
  color: #fff;
}
</style>
