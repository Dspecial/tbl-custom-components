<template>
  <div class="text-tooltip">
    <el-tooltip v-bind="$attrs" v-on="$listeners" :disabled="isShowTooltip">
      <div slot="content">
        <slot name="content">{{ content }}</slot>
      </div>
      <p class="over-flow" @mouseover="onMouseOver(refName)">
        <span :ref="refName">
          <slot name="contentOver">{{ content }}</slot>
        </span>
      </p>
    </el-tooltip>
  </div>
</template>

<script>
import { use, t } from '../../locale/index';
import en from '../../locale/lang/en';
import cn from '../../locale/lang/zh-CN';
export default {
  name: 'TblTooltipOver',
  props: {
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
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
  created() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
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
