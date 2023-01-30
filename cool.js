var XMLHttpRequest = require('xhr2');
var commits = "https://api.github.com/repos/ezgibas/gitupload/commits";
test(commits);
// test
function test(input, fileInput) {
    const http = new XMLHttpRequest();
    // get the commits data
    http.open("GET", input);
    http.send();
    http.onload = (e) => {
      // get the most recent commit data  
      var sha = JSON.parse(http.responseText)[0].sha;
      http.open("GET", input + "/" + sha);
      http.send();
      http.onload = (e) => {
        // get the raw file in the last commit (note: there might be multiple, this only gets one)
        var raw_url = JSON.parse(http.responseText).files[0].raw_url;
        http.open("GET", raw_url); 
        http.send();
        http.onload = (e) => {
            return http.responseText;
        }
      }
    }
      return null; // ?? eek
  };