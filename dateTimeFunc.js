/**
* Генерирует дату и время в заданном формате
* 12:59:52 03.09.2012
* @author Ильин Олег
* @param {String} strFormat формат-строка
* @returns {String} отформатированная дата
*/

  module.exports = {  getDateTimeToString: function(strFormat){
    var resultDateTime = strFormat;
    var d = new Date();
    
    var daysLong = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
    var daysShort = ["Пн.","Вт.","Ср.","Чт.","Пт.","Сб.","Вс."];
    var yearRegExp = d.getFullYear();
    var monthRegExp = (String(d.getMonth()+1).length ==1) ? ("0"+(d.getMonth()+1)) : (d.getMonth()+1);
    var dayRegExp = (d.getDate().toString().length ==1) ? ("0"+d.getDate()) : d.getDate();
    var dayNameRegExp = d.getDay();
    var hoursRegExp = (d.getHours().toString().length ==1) ? ("0"+d.getHours()) : d.getHours();
    var minuteRegExp = (d.getMinutes().toString().length ==1) ? ("0"+d.getMinutes()) : d.getMinutes();
    var secondsRegExp = (d.getSeconds().toString().length ==1) ? ("0"+d.getSeconds()) : d.getSeconds();
    var milisecondsRegExp = (d.getMilliseconds().toString().length ==1) ? ("00"+d.getMilliseconds()) : ((d.getMilliseconds().toString().length ==2) ? ("0"+d.getMilliseconds()) : d.getMilliseconds());
    
    resultDateTime = resultDateTime.replace(new RegExp('yyyy', 'g'), yearRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('yy', 'g'), String(yearRegExp).slice(-2));
    resultDateTime = resultDateTime.replace(new RegExp('MM', 'g'), monthRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('dddd', 'g'), daysLong[dayNameRegExp-1]);
    resultDateTime = resultDateTime.replace(new RegExp('ddd', 'g'), daysShort[dayNameRegExp-1]);
    resultDateTime = resultDateTime.replace(new RegExp('dd', 'g'), dayRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('hh', 'g'), hoursRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('mm', 'g'), minuteRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('ss', 'g'), secondsRegExp);
    resultDateTime = resultDateTime.replace(new RegExp('zz', 'g'), milisecondsRegExp);
    
    return resultDateTime+"";
    }
};