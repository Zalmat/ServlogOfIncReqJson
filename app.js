var express = require('express');
var app = express();
const fs = require("fs");
require('os').EOL //Для перевода строки
const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';

var bodyParser = require('body-parser');

//подключаем функцию как модуль.
var time = require('./dateTimeFunc');


//для роутинга - убрать
//var greet = express.Router()


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.post('/ReciveJSON', function (req,res) {
	console.log(req.body);
	console.log(req.baseUrl); // базовый адрес мой или источника?
	console.dir(req.hostname);
	res.send("  Thn'x Mean  ");

	

	fs.appendFile("hello.txt",`${newLineChar} [block] [time]${time.getDateTimeToString("dd-MM-yyyy hh:mm:ss")} [baseUrl]${JSON.stringify(req.baseUrl)} [host]${JSON.stringify(req.hostname)}  [body]${JSON.stringify(req.body)} [/block]`, function (error) {
		if (error) throw error; //Если возникла ошибка
		console.log("Асинхронно заебенил отчётик. Содержимое: ");
		let data = fs.readFileSync("hello.txt", "utf8");
		console.log(data);// Выводим прочитанное
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
var myPort = 3000;
app.listen(myPort);
console.log("Здоровенько булы");
console.log('Слушаю на http://' + getServerIp()+':' + myPort + '/ReciveJSON');


//читать последнюю строку
//Нет файла - создавать
//либо хранить тысячу строччек, либо делать файлики
//фиксировать источник запроса -?
// создавать файл с датой текущего дня и туда логировать