<template>
  <div class="ui-fas">
    <el-input v-model="name" :placeholder="_placeholder" ref="input" @focus="_popoverShowFun" v-popover:popover clearable readonly :disabled="disabled">
      <template slot="prepend"><i :class="[prefixIcon]" /></template>
    </el-input>

    <!-- 弹出框 -->
    <el-popover :disabled="disabled" ref="popover" :placement="placement" popper-class="el-icon-popper" :width="width" v-model="visible" trigger="click">
      <div class="title">{{ titleBasic }}</div>
      <div class="icon-dropdown">
        <ul class="fas-icon-list">
          <li v-for="(item, index) in elIconList" :key="index" @click="selectedIcon(item)">
            <i :class="item" :title="item" />
          </li>
        </ul>
      </div>

      <div class="title">{{ titleCustom }}</div>
      <div class="icon-dropdown">
        <ul class="fas-icon-list">
          <li v-for="(item, index) in customIconList" :key="index" @click="selectedIcon(item)">
            <i :class="['iconfontTBL', item]" :title="item" />
          </li>
        </ul>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { use, t } from '../../locale/index';
import en from '../../locale/lang/en';
import cn from '../../locale/lang/zh-CN';
import elIconList from './iconList/elIconfont';
import tblIconList from './iconList/tblIconfont';
import { off, on } from './utils/dom';
export default {
  name: 'TblIconPicker',
  props: {
    lang: {
      type: String,
      default: 'cn', // en|cn
    },
    // 是否禁用文本框
    disabled: {
      type: Boolean,
      // false
      default() {
        return false;
      },
    },
    // 弹出框位置
    placement: {
      type: String,
      //  bottom
      default() {
        return 'bottom';
      },
    },
    value: {
      type: String,
      default() {
        return '';
      },
    },
    placeholder: {
      type: String,
      // default() {
      //   return '请选择图标';
      // },
    },
  },
  data() {
    return {
      titleBasic: '',
      titleCustom: '',
      elIconList: elIconList,
      customIconList: tblIconList,
      visible: false, // popover v-model
      width: 200,
      prefixIcon: 'el-icon-edit',
      name: '',
    };
  },
  watch: {
    name: function(val) {
      setTimeout(() => {
        this.prefixIcon = val ? val : 'el-icon-edit';
      }, 200);
    },
    value: function(val) {
      setTimeout(() => {
        this.name = val;
      }, 200);
    },
  },
  computed: {
    _placeholder() {
      if (this.lang == 'en') {
        use(en);
      } else {
        use(cn);
      }
      return this.placeholder || t('custom.iconPicker.iconPlaceholder');
    },
  },
  mounted() {
    if (this.lang == 'en') {
      use(en);
    } else {
      use(cn);
    }
    this.titleBasic = t('custom.iconPicker.titleBasic');
    this.titleCustom = t('custom.iconPicker.titleCustom');
    this._updateW();
    this.$nextTick(() => {
      on(document, 'mouseup', this._popoverHideFun);
    });
  },
  beforeDestroy() {
    off(document, 'mouseup', this._popoverHideFun);
  },
  created() {
    this.prefixIcon = this.value ? this.value : 'el-icon-edit';
    this.name = this.value;
  },
  methods: {
    selectedIcon(item) {
      this.visible = false;
      this.name = item;
      this._emitFun();
    },
    // 更新宽度
    _updateW() {
      this.$nextTick(() => {
        this.width = this.$refs.input.$el.getBoundingClientRect().width - 26;
      });
    },
    // 显示弹出框的时候容错，查看是否和el宽度一致
    _popoverShowFun() {
      this._updateW();
    },
    // 点击控件外，判断是否隐藏弹出框
    _popoverHideFun(e) {
      if (e.path) {
        let isInter = e.path.some(list => {
          return list.className && list.className.indexOf('fas-icon-list') !== -1;
        });
        if (!isInter) {
          this.visible = false;
        }
      }
    },
    // 判断类型，抛出当前选中id
    _emitFun() {
      this.$emit('input', this.name);
      this._updatePopoverLocationFun();
    },
    // 更新popover位置
    _updatePopoverLocationFun() {
      // dom高度还没有更新，做一个延迟
      setTimeout(() => {
        this.$refs.popover.updatePopper();
      }, 50);
    },
  },
};
</script>

<style>
.el-icon-popper .icon-dropdown {
  height: 130px;
  overflow-y: auto;
}
.title {
  font-size: 1rem;
  margin: 5px 0;
}
.fas-icon-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.ui-fas .el-input__inner {
  cursor: pointer;
}

.fas-icon-list li {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 5px;
}

.fas-icon-list li i {
  font-size: 20px;
  cursor: pointer;
}

.el-icon-popper {
  max-height: 400px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: hidden;
}

.el-icon-popper[x-placement^='bottom'] {
  margin-top: 5px;
}
</style>
