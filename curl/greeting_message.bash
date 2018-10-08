curl -X POST -H "Content-Type: application/json" -d '{
  "greeting": [
    {
      "locale": "default",
      "text": "Hola {{user_first_name}}, Soy PugPizza y te recomiendo las mejores pizzas"
    },
    {
      "locale": "en_US",
      "text": "Hi {{user_first_name}}"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=EAAE0PfYa9nEBAP82aChJ30ka2CkXAZAtuSMk8QdNoAA9Huq9ZCplCFn88Q7ZB1cJ1a2IZAnO6ttEU2J3mI6KOKQudv6SZBm0mOkBPS7WpMNdstCQ8JXfIjidEWXjSUjC3O8rUEOYQMHef0fjmtvdX3hufpv1mSZC9MZCzN7or6EkAZDZD"