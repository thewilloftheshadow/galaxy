const re = require(`./resources.js`).data
const app = re.app
const passport = re.vars.passport
const express = re.vars.express
const client = re.client
const config = re.config
const authdb = re.dbs.authdb


//This module lets users stay logged in between pages
app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000 //1 hour
    }
  })
)

//These two functions initalize the user's data into req.user
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

//Issue token for cookies. We will use this later
function issueToken(user) {
  let token = re.func.randomString(64)
  authdb.set("tokens." + token, user.id)
  return token
}

//Use the tokens from the cookies. Again, later
function useToken(token) {
  let uid = authdb.get("tokens." + token)
  authdb.delete("tokens." + token)
  return uid
}

//Send everything in the public folder as a static page so we don't have to do each one ourselves
app.use(express.static(__dirname + "/public"))
//Parse cookies
app.use(require("cookie-parser")())
//Parse the body of a form
app.use(require("body-parser").urlencoded({ extended: true }))
//Initalize and setup session for passport
app.use(passport.initialize())
app.use(passport.session())
//Set our rendering engine to ejs
app.set("view engine", "ejs")

//Module I wrote so users stay logged in between server restarts
app.use(function(req, res, next) {
  if (req.user) authdb.set(req.user.id, req.user) // Store all user info
  if (req.user && !req.cookies.rememberme) {
    //logged in but no rm cookie
    console.log(req.cookies)
    let token = issueToken(req.user)
    res.clearCookie("remember-me")
    res.cookie("rememberme", token, {
      secure: true,
      httpOnly: true,
      maxAge: 604800000
    })
  }
  if (!req.user && req.cookies.rememberme) {
    //not logged in but rm cookie
    let uid = useToken(req.cookies.rememberme)
    res.clearCookie("rememberme")
    res.clearCookie("remember-me")
    if (!uid) return next()
    req.user = authdb.get(uid)
    let token = issueToken(req.user)
    res.cookie("rememberme", token, {
      secure: true,
      httpOnly: true,
      maxAge: 604800000
    })
  }
  next()
})

//When client is ready, start the server
client.on("ready", async () => {
  //Implement Discord's OAuth2 Strategy
  passport.use(
    new re.vars.Strategy(
      {
        clientID: client.user.id, //ID of the bot
        clientSecret: process.env.CLIENT_SECRET, //Client secret, found on the overpage on the dev portal
        callbackURL: config.callbackurl, //Callback URL that you added on the dev portal
        scope: config.scope //Things our app needs access to
      },
      //What to do when discord redirects back to us
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          done(null, profile)
          console.log("New login! " + Date.now()) //Log that someone logged in
        })
      }
    )
  )
  //For any get request at all
  app.get("*", (req, res) => {
    try {
      //redirect to custom domain
      if(config.customdomain){
      if (req.hostname.includes(process.env.PROJECT_DOMAIN + ".glitch.me")) {
        res.redirect(config.customdomain + req.url)
      }
      }
      req.next()
    } catch (e) {}
  })
  app.get("/", (req, res) => {
    res.redirect("https://discord.gg/Hr62m5X")
  })
  
//   app.get("/", (req, res) => {
//     let pass = { user: req.user || null, dclient: client }
//     res.render(__dirname + "/views/index.ejs", pass)
//   })

//   app.get("/register", (request, response) => {
//     response.redirect("https://discordapp.com/register")
//   })

//   app.get("/login", (request, response) => {
//     response.redirect("/auth/discord")
//   })

//   app.get("/invite", (req, res) => {
//     res.redirect("https://discord.gg/Hr62m5X")
//   })

//   app.get("/auth/discord", (request, response) => {
//     response.redirect(
//       `https://discordapp.com/oauth2/authorize?response_type=code&redirect_uri=${
//         config.callback
//       }&scope=${config.scope.replace(" ", "%20")}&client_id=${
//         client.user.id
//       }&prompt=none`
//     )
//   })

//   app.get(
//     "/auth/callback",
//     passport.authenticate("discord", {
//       failureRedirect: "/"
//     }),
//     (req, res) => {
//       res.redirect(`/`) // Successful auth
//     }
//   )

//   app.get("/logout", (req, res) => {
//     res.clearCookie("rememberme")
//     req.logout()
//     res.redirect("/")
//   })

//   app.get("/info", checkAuth, (req, res) => {
//     console.log(req.user)
//     res.sendStatus(200)
//   })

//   function checkAuth(req, res, next) {
//     if (req.user) return next()
//     res.redirect("/login")
//   }
  const listener = app.listen(process.env.PORT, function() {
    console.log(
      "The site is online, using port " + listener.address().port
    )
  })
})
