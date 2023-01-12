// Node Get ICE STUN and TURN list
let o = {
      format: "urls"
};

let bodyString = JSON.stringify(o);
let https = require("https");
let options = {
      host: "global.xirsys.net",
      path: "/_turn/MyFirstApp",
      method: "PUT",
      headers: {
          "Authorization": "Basic " + Buffer.from("heeje:118a76a4-927c-11ed-87b0-0242ac130006").toString("base64"),
          "Content-Type": "application/json",
          "Content-Length": bodyString.length
      }
};
let httpreq = https.request(options, function(httpres) {
      let str = "";
      httpres.on("data", function(data){ str += data; });
      httpres.on("error", function(e){ console.log("error: ",e); });
      httpres.on("end", function(){ 
          console.log("ICE List: ", str);
      });
});
console.log(httpreq.on("error", function(e){ console.log("request error: ",e); }))

console.log(httpreq.end());