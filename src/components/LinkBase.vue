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
    <slot />
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

.linkbase {
  overflow:hidden;}

.link, .action {
  overflow:hidden;
  display: block;
  text-decoration: none;
  text-align: center;
  outline: none;
  overflow:hidden;
}

.link *, .action * {
  /* transition: all 0.2s; */
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
  background: $color-act-mid;
  box-shadow: RGBA(0,0,0,0.3) -2px 2px 15px 0px inset;
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

.linkbase .icon {
  display:block;
  background:transparent;
  opacity:0.8;
  transition:all 0.2s;
  transition-delay: 0s !important;
  font-weight: normal;
  padding:5px;
  box-sizing: border-box;
  width: 40%;
  height:100%;
  float: right;
  text-align: right;
  opacity: 1.0;
  overflow: visible;
  opacity:0.5;
  color: $color-ui-0;

}

.linkbase.enabled:hover .icon {
  opacity:0.2;
  height:130%;
  width:50%;
  margin: -5px  0 0 0;
  padding:0px 5px 0 0;
}


.linkbase.link .icon
{  color: $color-ui-2; }

.linkbase.link:hover .icon
{  color: $color-act-mid; }

.linkbase.link.active .icon
{  color: $color-ui-0; }

.linkbase.link.active:hover .icon
{  color: $color-ui-0; }

.linkbase.link:hover .icon
{  color: $color-act-mid; }


.linkbase .label{
  display: block;
  text-align: left;
  font-size: 13px;
  line-height: 13px;
  padding:5px 5px 0 5px;
  margin-bottom: -5px;
  box-sizing: content-box;
  overflow: visible;
  width: 65%;
  height: 0;
  /*transition:all 0.2s ease-in;*/
}

.linkbase.disabled {
  background: $color-ui-main;
  cursor: default;
}
</style>
