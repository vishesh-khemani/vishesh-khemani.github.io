## Example front template for Anki note type

```html
<div id="front" class="card">Loading front...</div>
<div id="checkAnswer"></div>


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
      } catch(err) {
        alert(err);
      }
    }

    var code = (function () {/* {{Front}} */}).toString();
    code = code.slice(16, code.length - 4);
    eval(new DOMParser().parseFromString(code, "text/html").documentElement.textContent);
  })();


</script>
```
