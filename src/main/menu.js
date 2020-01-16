const { app, Menu } = require('electron')

const template = [
    {
        "label":"查看",
        "submenu":[
            {
                "role":"togglefullscreen",
                "accelerator":"ESC"
            },
            {
                "label":"开发者模式",
                "accelerator":"f12",
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            },
            {
                "role":"reload"
            },
            {
                "role":"quit"
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)