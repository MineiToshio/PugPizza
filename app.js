'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const access_token = "EAAE0PfYa9nEBAP82aChJ30ka2CkXAZAtuSMk8QdNoAA9Huq9ZCplCFn88Q7ZB1cJ1a2IZAnO6ttEU2J3mI6KOKQudv6SZBm0mOkBPS7WpMNdstCQ8JXfIjidEWXjSUjC3O8rUEOYQMHef0fjmtvdX3hufpv1mSZC9MZCzN7or6EkAZDZD";

const app = express()

app.set('port', (process.env.PORT || 5000)) //Asignar un puerto
app.use(bodyParser.json()) //Entender los elementos json que recibe el app

app.get('/', function(req, res) {
  res.send('Hola mundo')
})

app.get('/webhook', function(req,res) {
  if(req.query['hub.verify_token'] === 'pugpizza_token') {
    res.send(req.query['hub.challenge'])
  }
  else {
    res.send('Pug Pizza no tienes permisos')
  }
})

app.post('/webhook', function(req, res) {
  const webhook_event = req.body.entry[0]

  if(webhook_event.messaging) {
    webhook_event.messaging.forEach(event => {
     handleEvent(event.sender.id, event)
    })
  }
  res.sendStatus(200);
})

function handleEvent(senderId, event) {
  //Verificar si el evento es de mensaje 
  if (event.message) {
    if (event.message.quick_reply) {
      handlePostback(senderId, event.message.quick_reply.payload);
    }
    else {
      handleMessage(senderId, event.message)
    }
  }
  //Verificar si el evento es payload
  else if (event.postback) {
    handlePostback(senderId, event.postback.payload)
  }
}

function handleMessage(senderId, event) {
  if(event.text) {
    //defaultMessage(senderId)
    //messageImage(senderId)
    //contactSupport(senderId)
    //showLocation(senderId)
    //receipt(senderId)
    getLocation(senderId)
  }
  else if(event.attachments) {
    handleAttachments(senderId, event)
  }
}

function defaultMessage(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "text": "Hola, soy un bot de Messenger y te invito a utilizar nuestro menú",
      "quick_replies": [
        {
          "content_type": "text",
          "title": "¿Quieres una pizza?",
          "payload": "PIZZAS_PAYLOAD"
        },
        {
          "content_type": "text",
          "title": "Acerca de",
          "payload": "ABOUT_PAYLOAD"
        }
      ]
    }
  }
  sendMessage(senderId, messageData)
}

function handlePostback(senderId, payload) {
  console.log(payload)

  switch (payload) {
    case "GET_STARTED_PUGPIZZA":
      console.log("Se inició PugPizza")
      break;
    case "PIZZAS_PAYLOAD":
      showPizzas(senderId)
      break;
    case "PEPPERONI_PAYLOAD":
      sizePizza(senderId);
      break;
  }
}

function senderActions(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "sender_action": "typing_on"
  }
  callSendApi(messageData)
}

function handleAttachments(senderId, event) {
  // ver el tipo de attachmnent
  let attachment_type = event.attachments[0].type

  switch (attachment_type) {
    case "image":
      console.log(attachment_type)
      break;
    case "video":
      console.log(attachment_type)
      break;
    case "audio":
      console.log(attachment_type);
      break;
    case "file":
      console.log(attachment_type);
      break;
    case "location":
      console.log(JSON.stringify(event))
      break;
  }
}

function callSendApi(res) {
  request({
    'uri': 'https://graph.facebook.com/me/messages',
    'qs': {
      'access_token': access_token
    },
    'method': 'POST',
    'json': res
  },
  function(err) {
    if(err) {
      console.log('Ha ocurrido un error')
    }
    else {
      console.log('Mensaje enviado')
    }
  })
}

function showPizzas(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [
            {
              "title": "Pepperoni",
              "subtitle": "Con todo el sabor del pepperoni",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Elegir Pepperoni",
                  "payload": "PEPPERONI_PAYLOAD"
                }
              ]
            },
            {
              "title": "Pollo BBG",
              "subtitle": "Con todo el sabor de BBQ",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Elegir Pollo BBQ",
                  "payload": "BBQ_PAYLOAD"
                }
              ]
            }
          ]
        }
      }
    }
  }
  sendMessage(senderId, messageData)
}

function sizePizza(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      attachment: {
        "type": "template",
        "payload": {
          "template_type": "list",
          "top_element_style": "large",
          "elements": [
            {
              "title": "Individual",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
              "subtitle": "Porción individual de pizza",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Elegir Individual",
                  "payload": "PERSONAL_SIZE_PAYLOAD"
                }
              ]
            },
            {
              "title": "Mediana",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
              "subtitle": "Porción mediana de pizza",
              "buttons": [
                {
                  "type": "postback",
                  "title": "Elegir Mediana",
                  "payload": "MEDIUM_SIZE_PAYLOAD"
                }
              ]
            }
          ]
        }
      }
    }
  }
  sendMessage(senderId, messageData)
}

function messageImage(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "attachment": {
        "type": "image",
        "payload": {
          "url": "https://media.giphy.com/media/1dOIvm5ynwYolB2Xlh/giphy.gif"
        }
      }
    }
  }
  sendMessage(senderId, messageData)
}

function contactSupport(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "Hola, este es el canal de soporte, ¿quieres llamarnos?",
          "buttons": [
            {
              "type": "phone_number",
              "title": "Llamar a un asesor",
              "payload": "+5412236520"
            }
          ]
        }
      }
    }
  }
  sendMessage(senderId, messageData)
}

function showLocation(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "list",
          "top_element_style": "large",
          "elements": [
            {
              "title": "Sucursal México",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
              "subtitle": "Av. Los Postes 425",
              "buttons": [
                {
                  "title": "Ver el mapa",
                  "type": "web_url",
                  "url": "https://goo.gl/maps/GCCpWmZep1t",
                  "webview_height_ratio": "full"
                }
              ]
            },
            {
              "title": "Sucursal Colombia",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg",
              "subtitle": "Av. Los Joardines 1254",
              "buttons": [
                {
                  "title": "Ver el mapa",
                  "type": "web_url",
                  "url": "https://goo.gl/maps/GCCpWmZep1t",
                  "webview_height_ratio": "tall"
                }
              ]
            }
          ] 
        }
      }
    }
  }
  sendMessage(senderId, messageData)
}

function receipt(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "receipt",
          "recipient_name": "Sergio Minei",
          "order_number": "123456",
          "currency": "PEN",
          "payment_method": "Efectivo",
          "order_url": "https://platzi.com/order/123456",
          "timestamp": "123123123",
          "address": {
            "street_1": "Platzi HQ",
            "street_2": "----",
            "city": "Lima",
            "postal_code": "1375",
            "state": "Lima",
            "country": "Peru"
          },
          "summary": {
            "subtotal": 12.00,
            "shipping_cost": 2.00,
            "total_tax": 1.00,
            "total_cost": 15.00
          },
          "adjustments": [
            {
              "name": "Descuento Frecuente",
              "amount": 1.00
            }
          ],
          "elements": [
            {
              "title": "Pizza Pepperoni",
              "subtitle": "La mejor pizza de pepperoni",
              "quantity": 1,
              "price": 10,
              "currency": "PEN",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg"
            },
            {
              "title": "Bebida",
              "subtitle": "Jugo de Tamarindo",
              "quantity": 1,
              "price": 2,
              "currency": "PEN",
              "image_url": "https://s3.amazonaws.com/chewiekie/img/productos-pizza-peperoni-champinones.jpg"
            }
          ]
        }
      }
    }
  }
  sendMessage(senderId, messageData)
}

function getLocation(senderId) {
  const messageData = {
    "recipient": {
      "id": senderId
    },
    "message": {
      "text": "¿Puedes proporcionarnos tu ubicación?",
      "quick_replies": [
        {
          "content_type": "location"
        }
      ]
    }
  }
  sendMessage(senderId, messageData)
}

function sendMessage(senderId, res) {
  senderActions(senderId)
  callSendApi(res)
}

app.listen(app.get('port'), function() {
  console.log('Nuestro servidor está funcionando en el puerto', app.get('port'))
})