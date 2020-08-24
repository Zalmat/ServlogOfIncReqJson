var express = require('express');
var app = express();
const fs = require("fs");
require('os').EOL //Для перевода строки
const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';


var bodyParser = require('body-parser');

//подключаем функцию как модуль.
var time = require('./dateTimeFunc');

//Добавляем поддержку SSL
const https = require('https') 

//Добавляем серт и закрытый ключ
const options =  
    {      
	  cert: fs.readFileSync('./cert/59-BS-TERM-Test_ShopApi-001.pem'),
	  key: fs.readFileSync('./cert/foo.key'),
	};

	
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.post('/ReciveJSON', function (req,res) {
	console.log(req.body);
	console.log(req.baseUrl); // базовый адрес мой или источника?
	console.dir(req.hostname);
	res.send("  Thn'x Mean  ");

	//проверяем существование файла, если нет - создаем.
	const path = "./logs/"+time.getDateTimeToString("dd-MM-yyyy")+".txt"

	try {
	  if (fs.existsSync(path)) {
		//file exists
	  }
	} catch(err) {
	  fs.writeFileSync("./"+time.getDateTimeToString("dd-MM-yyyy")+".txt");
	}
	//Проверка окончена
	

	fs.appendFile("./logs/" + time.getDateTimeToString("dd-MM-yyyy")+".txt",`${newLineChar} [block] [time]${time.getDateTimeToString("dd-MM-yyyy hh:mm:ss")} [baseUrl]${JSON.stringify(req.baseUrl)} [hostname]${JSON.stringify(req.hostname)}  [body]${JSON.stringify(req.body)} [/block]`, function (error) {
		if (error) throw error; //Если возникла ошибка
		//console.log("Залогировал содержимое: "); - использовалось для тестов.
		//let data = fs.readFileSync(time.getDateTimeToString("dd-MM-yyyy")+".txt", "utf8"); - не актуально.
		//console.log(data);// Выводим прочитанное
		var myHost = JSON.stringify(req.baseUrl);
	});
});
//для получения локального IP адреса.
function getServerIp() {

	var os = require('os');
	var ifaces = os.networkInterfaces();
	var values = Object.keys(ifaces).map(function(name) {
	  return ifaces[name];
	});
	values = [].concat.apply([], values).filter(function(val){ 
	  return val.family == 'IPv4' && val.internal == false; 
	});
  
	return values.length ? values[0].address : '0.0.0.0';
  }

//Указалываем https
var myPort = 3000;
https.createServer(options, app).listen(myPort);
console.log("Здоровенько булы");
console.log('Слушаю на https://' + getServerIp()+':' + myPort + '/ReciveJSON');
