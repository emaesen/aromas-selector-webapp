<template>
  <div id="app">
    <header id="header">
      <router-link :to="'#top'" class="float right action button">top</router-link>
      <img src="/img/icons/favicon-32x32.png" class="icon"/>
      <div class="header">Aromas Selector</div>
      <nav>
        <router-link to="/aromas/" class="">Aromas</router-link>
        |
        <router-link to="/aroma-groups/" class="">Aroma Groups</router-link>
        |
        <router-link to="/aroma-terms/" class="">Terminology</router-link>
      </nav>
    </header>


    <main id="main">
      <router-view/>
    </main>

    <footer class="build-info">
      {{ buildInfoText }} 
    </footer>
  </div>

</template>

<script>
//import { onMounted, watch } from '@vue/composition-api'

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
    };
  },
  setup(props, context) {
    const { $store, $router } = context.root
    console.log("App setup", {props, $store, $router})

    return {}
  },
  computed: {
    buildInfoText() {
      const options = { dateStyle: "medium", timeStyle: "short" };
      if (process.env.NODE_ENV==="development") {
        return "Dev hot reload: " + (new Date()).toLocaleString('en-US', options);
      } else {
        const buildAt = process.env.VUE_APP_BUILD_AT
        if (buildAt) {
          return "Build: " + (new Date(buildAt)).toLocaleString('en-US', options);
        }
        return ""
      }
    },
  },
  methods: {

  }

}
</script>


<style lang="less">
body {
  background-color: #17161c;
  margin: 9px;
}
body,
input,
textarea,
select,
button {
  color: #e9e4f2;
  font-family: Candara, Helvetica, Arial, sans-serif;
  font-size: 14px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fffef5;
}
h1 {
  margin-top: 2.5em;
}
h2 {
  margin: 0 0 0.5em 0.2em;
}
#app {
  position: relative;
}
#main {
  min-height: calc(100vh - 180px);
}
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: #000;
  font-family: monospace;
  text-align: center;
  color: #fffef5;
  padding: 3px 0;
  border-bottom: 5px solid #333;
  opacity: 0.8;
}

.build-info{
  font-family: monospace;
  text-align: center;
  color: #fffef5;
  opacity: 0.6;
  letter-spacing: .45em;
  font-size: 72%;
  text-transform: uppercase;
  margin-top: 90px;
}

#header .date,
#header .time {
  display: inline-block;
}
#header .date::after {
  content: ",";
  margin-right: 1em;
}
.header {
  letter-spacing: 1em;
  padding-left: 1em;
  font-size: 72%;
  text-transform: uppercase;
}
section {
  padding: 5px;
  background-color: #393744;
  border: 1px solid #2c2b31;
  border-radius: 5px;
  position: relative;
  margin: 2em 0 3em;
}
hr {
  border-color: #aca0a072;
  margin: 0.5em 0 0.3em;
}
ul {
  padding-inline-start: 0;
  margin-block-start: 0.5em;
}
ul ul {
  padding-inline-start: 1em;
  margin-block-start: 0;
  margin-block-end: 0.2em;
}
li {
  list-style-type: none;
}
fieldset {
  border: 1px solid #555;
  border-radius: 10px;
  display: inline-block;
  margin-inline: 2px;
  padding-block: .2em;
  padding-inline: .7em;
  width: calc(100vw - 5em);
}
legend {
  margin: 1em 0;
  font-size: 1.1rem;
}
label {
  display: flex;
  margin-left: 0.3em;
  font-weight: bold;
  letter-spacing: 1px;
  font-style: italic;
  color: #cec0a1;
}
textarea {
  min-height: 4em;
  width: 90%;
  width: -moz-available;
  width: -webkit-fill-available;
  max-width: 90%;
}
textarea.short {
  min-height: 2em;
}
textarea.tall {
  min-height: 8em;
}
input,
textarea,
select,
button {
  background-color: rgba(231, 231, 231, 0.87);
  color: #0e0d0f;
  font-weight: 400;
  border: 1px solid #333;
  border-radius: 5px;
  padding: .2em;
  margin-bottom: 1em;
}
input,
textarea,
select {
  min-width: 20em;
  cursor: default;
}
select {
  background-color: rgba(231, 231, 231, 0.36);
  overflow: auto;
  vertical-align: top;
}
select:not([multiple]) {
  padding-right: 1em;
  display: grid;
  grid-template-areas: "select";
  align-items: center;
}
select[multiple] {
  appearance: none;
}
select:not([multiple])::after {
  grid-area: select;
  justify-self: end;
  content: "";
  width: 0.8em;
  height: 0.5em;
  background-color: rgba(231, 231, 231, 0.36);
  clip-path: polygon(100% 0%, 0 0%, 50% 100%);
}
textarea::placeholder,
input::placeholder {
  color: rgba(255, 202, 58, 0.87);
  font-weight: 400;
  font-style: italic;
}
input:focus,
textarea:focus,
select:focus {
  outline-color: #888;
  outline-width: 1px;
  color: #050505;
  background-color: rgba(207, 206, 204, 0.938);
}
button:focus {
  outline: none;
}
input[type="number"] {
  width: 5rem;
}
input[type="submit"] {
  cursor: pointer;
}
input[type="submit"]:not(.inactive):hover {
  border-color: #888;
}
input[type="submit"]:disabled,
button:disabled {
  cursor: default;
  color: #e9e4f250;
}
input[type="submit"].loading:disabled {
  color: #e9e4f290;
}
input:invalid + span.icon:after {
  content: "✖";
  color: #f00;
  padding-left: 5px;
}
input:valid + span.icon:after {
  content: "✓";
  color: #26b72b;
  padding-left: 5px;
}
pre {
  margin: 0.5em;
  padding: 0.5em;
}
code {
  padding: 0 0.2em;
}
pre,
code {
  color: #daefff;
}
img.icon{
  position: absolute;
  left: 2px;
  top: 0;
  background-color: #fff;
  border: 1px solid #fff;
  opacity: 0.8;
}
#auth {
  position: absolute;
  right: 9px;
  a {
    font-weight: bold;
    &.router-link-exact-active {
      color: #edf2e4;
      cursor: default;
    }
  }
}
a,
.action {
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 1px;
  color: #bdb1db;
  font-style: normal;
}
a.router-link-active {
  cursor: default;
  color: inherit;
}
.action.button {
  vertical-align: middle;
  font-weight: bold;
  border: 1px solid #62518c;
  background-color: #3e2200;
  padding: 2px 5px;
  margin: 5px 0;
  display: inline-block;
  border-radius: 5px;
  line-height: 21px;
  font-size: 14px;
  font-family: Helvetica, Arial, sans-serif;
  text-transform: initial;
  min-width: 1em;
  text-align: center;
}
a.action.button.router-link-active {
  color: rgb(189, 177, 219);
}
.action.button.inactive {
  cursor: default;
}
button,
.action.button {
  background-color: transparent;
  border: 1px solid #8270ad;
}
.action.button + .action.button {
  margin-left: 5px;
}
button,
.actionable {
  cursor: pointer;
}
button:not(.inactive):hover,
.action.button:not(.inactive):hover {
  background-color: #351212;
}
.actionable {
  margin: -4px;
  padding: 4px;
}
.actionable:not(.inactive):hover {
  background-color: #1f0303;
}
.loading,
.noresults {
  color: #ffa04c;
  font-style: italic;
}
.info {
  color: #e9e4f272;
}
.alert {
  background-color: #300;
  margin: 0 -10px -10px;
  padding: 0 10px 10px;
}
.nowrap {
  white-space: nowrap;
}
.inline-block {
  display: inline-block;
}

input,
label {
  display: inline-block;
}
input[type="radio"],
input[type="checkbox"] {
  visibility: hidden;
  width: .1em;
  min-width: .1em;
  margin-bottom: 2em;
}
span.clear::before,
input[type="radio"] + label::before,
input[type="checkbox"] + label::before {
  content: "✓ ";
  opacity: .18;
}
span.clear.checked::before,
input[type="radio"]:checked + label::before,
input[type="checkbox"]:checked + label::before {
  content: "✓ ";
  color: #29dc58;
  opacity: 1;
}
.action.button.clear {
  margin-left: 0.9em;
}
label.action.button {
  vertical-align: initial;
  margin-left: -0.5em;
  margin-right: 0.3em;
}
label {
  margin-left: -0.2em;
  margin-right: 0.3em;
}
label.no_change_when_clicked {
  opacity: .45;
  cursor: inherit;
}
label.no_results_when_clicked {
  opacity: .45;
  cursor: inherit;
  border-color: #dd0000;
  .cntr {
    color: #dd0000;
  }
}
.filter-set {
  display: inline-block;
}
.filters {
  padding: 5px;
}
.filter {
  display: inline-block;
}
.none {
  color: #948972;
}
.filter-type {
  display: inline-block;
  min-width: 3.5em;
}

/* "clearfix" */
.group:after {
  content: "";
  display: table;
  clear: both;
}
.float {
  float: left;
}
.float.right {
  float: right;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.top {
  top: 0;
}
.right {
  right: 0;
}
.right.spaced {
  right: 5px;
}
.left-margin5 {
  margin-left: 5px;
}
.right-margin5 {
  margin-right: 5px;
}
.auth-state {
  display: inline;
}
.hidden {
  visibility: hidden;
}
.svg-inline--fa {
  color: #cec0a1;
  margin-right: 0.3em;
}
.svg-inline--fa.flush-right {
  margin-right: 0;
}
::-webkit-scrollbar {
  background-color: #676479;
  width: 9px;
  height: 9px;
  border-radius: 9px;
}
::-webkit-scrollbar-track {
  border-radius: 9px;
}
::-webkit-scrollbar-thumb {
  background-color: #c6c1e4;
  border-radius: 9px;
  border: 1px solid #676479;
}
@media all and (max-width: 700px) {
  .remove-on-small-device {
    display: none !important;
  }
  .convert-to-block-on-small-device {
    display: block !important;
  }
  body,
  input,
  textarea,
  select,
  button {
    font-size: 12px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: normal;
  }
  .header,
  .build-info{
    letter-spacing: .27em;
  }
}
@media print {
  header,
  footer,
  .no-print {
    display: none !important;
  }
  body {
    background-color: #fff !important;
  }
  body,
  input,
  textarea,
  select,
  button {
    color: #17161c !important;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 12px !important;
  }
  h1 {
    margin-top: 0;
  }
}
</style>
