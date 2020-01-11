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