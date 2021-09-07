<script>
import { defineComponent, h } from 'vue'

const getChildrenTextContent = chidren => {}

export default defineComponent({
  props: {
    level: { type: Number, required: true }
  },
  render() {
    return h(`h${this.level}`, null, this.$slots.default())
  }
})
</script>
