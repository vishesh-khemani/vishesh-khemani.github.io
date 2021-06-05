## Example front template for Anki note type

```html
<div id="front" class="card">Loading question...</div>

<script>
  var injectScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  (async () => {
    if (typeof placeValue === 'undefined') {
      try {
        await injectScript('https://unpkg.com/mathjs/lib/browser/math.js');
        await injectScript('https://vishesh-khemani.github.io/anki/math/util.js');
        await injectScript('https://vishesh-khemani.github.io/anki/math/common.js');
        await injectScript('https://vishesh-khemani.github.io/anki/math/elementary/elementary.js');
        await injectScript('https://vishesh-khemani.github.io/anki/math/middle/middle.js');
      } catch(err) {
        document.getElementById("front").innerHTML = err;
      }
    }

    var code = (function () {/* {{Script}} */}).toString();
    code = code.slice(16, code.length - 4);
    eval(new DOMParser().parseFromString(code, "text/html").documentElement.textContent);
  })();


</script>
```

## Example back template for Anki note type

```html
{{FrontSide}}

<hr id="answer">

<div id="back" class="card">Loading answer...</div>
<script>displayAnswer();</script>
```

## Example styling

```
.card {
 font-family: arial;
 font-size: 20px;
 text-align: left;
 color: black;
 background-color: white;
}
```
