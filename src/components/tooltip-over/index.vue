<template>
  <div class="text-tooltip">
    <el-tooltip v-bind="$attrs" v-on="$listeners" :disabled="isShowTooltip" :content="content.toString()">
      <template #[slotName]="slotProps" v-for="(slot, slotName) in $slots">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
      <p class="over-flow" @mouseover="onMouseOver(refName)">
        <span :ref="refName">{{ content }}</span>
      </p>
    </el-tooltip>
  </div>
</template>

<script>
import { t } from '../../locale/index';
export default {
  name: 'TblTooltipOver',
  props: {
    // 显示的文字内容
    content: {
      type: [String, Number],
      default: () => {
        return '';
      },
    },
    refName: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      isShowTooltip: true,
    };
  },
  methods: {
    onMouseOver(str) {
      const parentWidth = this.$refs[str].parentNode.offsetWidth;
      const contentWidth = this.$refs[str].offsetWidth;
      // 判断是否开启tooltip功能
      if (contentWidth > parentWidth) {
        this.isShowTooltip = false;
      } else {
        this.isShowTooltip = true;
      }
    },
  },
};
</script>

<style scoped>
.over-flow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
