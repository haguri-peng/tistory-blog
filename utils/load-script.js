export default function loadScript(url, mode) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script');

    if (mode == 'async') {
      script.async = true;
    } else if (mode == 'defer') {
      script.defer = true;
    }

    script.onload = function () {
      document.head.removeChild(script);
      resolve();
    };

    script.onerror = function () {
      document.head.removeChild(script);
      reject(new Error('Script loading is failed.'));
    };

    script.src = url;

    document.head.appendChild(script);
  });
}
