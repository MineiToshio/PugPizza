curl -X POST -H "Content-Type: application/json" -d '{
  "persistent_menu": [
    {
      "locale": "default",
      "composer_input_disabled": false,
      "call_to_actions": [
        {
          "title": "PugPizza",
          "type": "nested",
          "call_to_actions": [
            {
              "title": "Acerca",
              "type": "postback",
              "payload": "ABOUT_PAYLOAD"
            },
            {
              "title": "Sucursales",
              "type": "postback",
              "payload": "LOCATIONS_PAYLOAD"
            },
            {
              "title": "Ayuda",
              "type": "postback",
              "payload": "HELP_PAYLOAD"
            },
            {
              "title": "Contacto",
              "type": "postback",
              "payload": "CONTACT_PAYLOAD"
            }
          ]
        },
        {
          "title": "Menu de Productos",
          "type": "nested",
          "call_to_actions": [
            {
              "title": "Pizzas",
              "type": "postback",
              "payload": "PIZZAS_PAYLOAD"
            },
            {
              "title": "Especialidades",
              "type": "postback",
              "payload": "SPECIALS_PAYLOAD"
            },
            {
              "title": "Bebidas",
              "type": "postback",
              "payload": "DRINKS_PAYLOAD"
            },
            {
              "title": "Promociones",
              "type": "postback",
              "payload": "PROMOTIONS_PAYLOAD"
            }
          ]
        },
        {
          "title": "Pagina Web",
          "type": "web_url",
          "url": "https://platzi.com/bots-messenger/",
          "webview_height_ratio": "full"
        }
      ]
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAE0PfYa9nEBAP82aChJ30ka2CkXAZAtuSMk8QdNoAA9Huq9ZCplCFn88Q7ZB1cJ1a2IZAnO6ttEU2J3mI6KOKQudv6SZBm0mOkBPS7WpMNdstCQ8JXfIjidEWXjSUjC3O8rUEOYQMHef0fjmtvdX3hufpv1mSZC9MZCzN7or6EkAZDZD"