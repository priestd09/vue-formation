import { makeTemplateBindings, extendMethods, extendProps } from './common/index'

export default function A (binding, framework, component, version) {
  let template = `<a ${makeTemplateBindings(binding)}>
  <component v-for="c in components"
    :is="kebab('formation-' + c.type)"
    :config="c.config"
    :components='c.components'
    :bindings="bindings"
    :framework="framework"
    :value.sync="value"></component>
</a>`

  return {
    template,
    name: 'formation-a',
    props: extendProps(version),
    methods: extendMethods({}),
    created () {
      this.$formationRegisterComponents(this, this.components, this.bindings, this.framework)
    }
  }
}
