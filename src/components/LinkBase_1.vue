<template>
  <router-link
    ref = "link-outer"
    v-bind:to = "path"
    v-bind:class = "{
      linkbase: true,
      action: button,
      link: !button,
      disabled: disabled,
      enabled: !disabled,
      active: active
    }"
    @click.native = "click"
  >
    <div
      v-if="label"
      v-bind:class = "{label:icon,noselect:true}"
      v-html = "$dict.get(label)"
    />
    <faIcon
      v-if="icon"
      v-bind:class="{icon: label}"
      v-bind:icon="icon"
    />
    <faIcon
      v-if="iconHover"
      v-bind:class="{icon: label, iconHover: true}"
      v-bind:icon="iconHover"
    />
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'LinkBase',
  props: {
    to: { type: [Object, Boolean], default: false},
    button: { type: Boolean, required: false, default: false },
    active: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    icon: { type: String, required: false, default: '' },
    iconHover: { type: String, required: false, default: '' },
    label: { type: String, required: false, default: '' },
  },
  computed: {
    loading () { return this.$store.state.loading },
    path () { return this.loading || !this.to ? '#' :  this.to }
  },
  methods: {
    click () { !this.disabled && this.$emit('click') }
  },
}
</script>

<style lang="scss">
@import "../assets/css/vars.scss";
.link, .action {
  overflow:hidden;
  display: block;
  text-decoration: none;
  text-align: center;
  outline: none;
}

.link *, .action * {
  transition: all 0.2s;
}

.link, .link.nohover:hover {
  background: $color-ui-main;
  color: $color-ui-5;
}

.link:hover, .link.hover,.link.nohover.hover:hover {
  background:$color-act-pale;
  color:$color-ui-9;
}

.link.active, .link.active:hover,.link.active.nohover:hover {
  /* cursor: default; */
  background: $color-act-mid;
  box-shadow: RGBA(0,0,0,0.2) -2px 2px 15px 0px inset;
  color: $color-ui-0 !important;
}

.action {
  cursor: pointer;
  background: $color-act-mid;
  color: $color-ui-0;
}

.action:hover {
  background: $color-act-dark;
}

.loading .action,
.loading .action:hover {
  background: $color-ui-2;
  cursor:default;
}

.loading .link,
.loading .link.active,
.loading .link:hover {
  background: $color-ui-main;
  cursor:default;
}

.icon {
  display:inline-block;
  font-size: 22px;
  width: inherit;
  height: inherit;
  background:transparent;
  opacity:0.8;
  transition:all 0.2s ease-in;
  margin-top:39px;
  font-weight: normal;
}

/*.linkbase.enabled:hover .icon {*/
.linkbase.enabled .icon {
  margin-top:-5px;
  margin-left:35px;
  font-size:44px;
  opacity:0.1;
}

/*.linkbase.enabled:hover .label{*/
.linkbase.enabled .label{
  opacity:1;
  margin-top:4px;
}

.linkbase .label {
  text-align:left;
  line-height: 12px;
  height: 0px;
  padding:0 2px 0 5px;
  margin:0 auto;
  margin-top:-39px;
  opacity: 1.0;
  font-size: 11px;
  transition:all 0.2s ease-in;
}

.linkbase.disabled {
  background: $color-ui-main;
  cursor: default;
}
</style>
