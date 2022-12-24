# Overview

This is poker bot implemented for https://www.pokernow.club/ as a chrome extension.

If you are working on Visual Studio Code you can press CTRL+SHIFT+V to view this readme with a nicer interface.
Otherwise you can paste the contents into https://markdownlivepreview.com/

To use the poker bot:

* you first need to build it (instructions follow in the next sections)

* add the build as a chrome extension

* run the bot in the browser by click on the extension icon in chrome and then on the "start bot" button

If you want to edit the code to make your own bot, see the detailed instructions at the end of this readme.
TL;DR implement the `getAction` function in `src/ai/ai.ts`.


# Build

You need node js to build the extension. I used version v14.18.1, I don't know if it works with any other version.

First, install dependencies:
```
npm i
```

The `i` in the command stands for install. You need only run this once.


To build, execute this command in the root folder of this project:
```
npm run build
```

You need to run this command every time you edit the code.

You can find the build output in the `/dist` folder under the root of the project.


# Add extension to chrome

Follow this video from 4:26 to 5:00
https://www.youtube.com/watch?v=0n809nd4Zu4&t=4m26s

Note that you need to select the `/dist` folder, not the project root!


# Implementing your own bot

I suggest you create a folder for you code under `src/ai` like I did for the if-then-else bot.

In your code you need to implement a `getAction(state: State): Action` function.

Then you need to edit `src/ai/ai.ts` to call your code instead.

In `src/ai/aiUtils.ts` you can find functions for common logic such as:
* what pairs are there in this list of cards?
* is there an open ended straight draw in this list?
* what's the highest card in this list?

In `src/ai/probabilisticAction.ts` you find utilities for randomly weighted actions.

The code checks every half second if it's the bot's turn in `src/main.ts` and when it is the `getAction` function is called.

If `getAction` throws an exception or returns a nonsensical action, the bot will check or fold.

If you need to do or read something on the web page that I didn't code already, you should write a function in `src/ui.ts`, which contains all code interacting with the page.
Typically you will call `document.querySelector(...)` with a css selector to get a dom element and do something with it.

If you want to edit the popup that opens when you click the extension icon look into `src/pages`.

Note that the extension only runs when you're on `https://www.pokernow.club`.
If you need to run it somewhere else you need to edit `public/manifest.json` and change the following line to fit your use case:
```
"matches": ["https://www.pokernow.club/*"],
```

To enable the extension everywhere simply use:
```
"matches": ["<all_urls>"],
```

## Apply code changes to the extension

Whenever you edit any code you need to:
* (optional) increase the version in `public/manifest.json`
* rebuild the extension
* reload the extension in the browser
* refresh the pokernow page
* restart the bot

I recommend you always increase the version because this is logged in the browser console when the extension is loaded (look for "pokerbot vX.Y") and lets you easily make sure that you succesfully updated the bot.
Otherwise you might risk running an older version without realizing it.

# Debugging

This is basic js stuff: when you `console.log` something remember that chrome will let you thoroughly inspect any object you pass.

This means that if you do something like:
```
console.log("some message", {
    someField: {
        someNestedField: ...
    },
    someOtherField: ...
});
```
You will be able to see all (nested) fields in the console.

By default my code will log the state of the game, some stats, the action it gets as output of the `getAction` function and the sanitized action.

If you need to debug line by line with the chrome debugger, look for any line logged by the bot. At the right border you will find a clickable link like `main.js:1234`. This will take you to line `1234` of the build output javascript. Here you can place any breakpoint you need.

The build output is largely 1:1 with respect to the typescript source, it's not obfuscated or uglyfied, so you should have no trouble following it.

Unfortunately I have not found a way to debug on the original source, despite a sourcemap being generated in the webpack config. If you do, tell me!
