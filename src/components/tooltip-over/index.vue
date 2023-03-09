<template>
  <div class="text-tooltip">
    <el-tooltip v-bind="$attrs" v-on="$listeners" :disabled="isShowTooltip">
      <div slot="content">
        <slot name="contentTip" v-if="$slots.contentTip"></slot>
        <span v-else>{{ showHtml }}</span>
      </div>
      <p class="over-flow" @mouseover="onMouseOver(refName)">
        <span :ref="refName">
          <slot name="contentOver" v-if="$slots.contentOver"></slot>
          <span v-else>{{ showHtml }}</span>
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
  computed: {
    showHtml() {
      let text = '';
      if (this.$slots.contentOver) {
        text = this.$slots.contentOver[0].children[0].text;
      } else if (this.$slots.contentTip) {
        text = this.$slots.contentTip[0].children[0].text;
      }
      return this.content || text;
    },
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
