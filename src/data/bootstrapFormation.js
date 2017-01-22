export default {
  modelData: {
    text1: 'one'
  },
  divdata: {
    components: [
      {
        type: 'text-input',
        config: {
          model: 'text1',
          on: {
            keydown: {
              handler (event, config, data) {
                console.log({
                  event,
                  vm: this,
                  value: data[config.model]
                })
              },
              modifiers: ['ctrl', 'shift', 'delete']
            }
          }
        }
      },
      {
        type: 'button',
        config: {
          text: 'click me',
          attrs: {
            class: 'btn-primary'
          }
        }
      },
      {
        type: 'div',
        components: [
          {
            type: 'button',
            config: {
              type: 'danger',
              text: 'stuff'
            }
          }
        ]
      },
      {
        type: 'container',
        components: [
          {
            type: 'div',
            components: [
              {
                type: 'container',
                components: [
                  {
                    type: 'button',
                    config: {
                      type: 'danger',
                      text: 'DEEP'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
