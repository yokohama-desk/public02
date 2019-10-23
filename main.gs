function doGet() {
  var htmlOutput = HtmlService.createTemplateFromFile("index2").evaluate();
  htmlOutput
    .setTitle('GAS+Vue.js')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setFaviconUrl('https://drive.google.com/uc?id=1PJCbmO0jz6mY8WOLByDGPMWL_E27vRy0&.png');
  return htmlOutput;
}
function getJsonData(){
  //スクリプトプロパティからシートのIDを取得
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid"); 
  return backjson2(ssid,'日付あり');

}
function replaceElement(array, before, after,pos) {
//2時配列置換　引数:配列,置換前の文字列,置換後の文字列、二次配列目の位置 0スタート
  for(var i=0; i<array[0].length; i++){
    array[i][pos] = array[i][pos].replace(before, after);
  }
  return array;
}
function backjson2(ssid,sheetname) {
//スプレッドシートのデータをJSONで返す officeの杜
//http://daichan4649.hatenablog.jp/entry/2014/02/08/160453
//スプレッドシートデータを取得する
  var sheet = SpreadsheetApp.openById(ssid).getSheetByName(sheetname);
  var ss = sheet.getDataRange().getValues();
  var pos = 4;//urlの列
  var folderimg = 'https://drive.google.com/file/d/';//Google Dreive内url
  var urlimg  ='https://drive.google.com/uc?id=';//web上のurl
  ss = replaceElement(ss,folderimg,urlimg,pos);
  var delstr = '/view';
  var retstr = '';
  ss = replaceElement(ss,delstr,retstr,pos);
  //タイトル行を取得する
  var title = ss.splice(0, 1)[0];
  //空の要素を削除する
  //https://www.softel.co.jp/blogs/tech/archives/3924
  var ss = ss.filter(function(e){return e[0] !== "";});

  //JSONデータを生成する
  return JSON.stringify(ss.map(function(row) {
  var json = {}
  row.map(function(item, index) {
  json[title[index]] = item;
  });
  return json;
  }));
}
function backjson1(ssid,sheetname) {
//スプレッドシートのデータをJSONで返す officeの杜
//http://daichan4649.hatenablog.jp/entry/2014/02/08/160453
//スプレッドシートデータを取得する
  var sheet = SpreadsheetApp.openById(ssid).getSheetByName(sheetname);
  var ss = sheet.getDataRange().getValues();
  //タイトル行を取得する
  var title = ss.splice(0, 1)[0];
  //空の要素を削除する
  //https://www.softel.co.jp/blogs/tech/archives/3924
  var ss = ss.filter(function(e){return e[0] !== "";});
  
  //JSONデータを生成する
  return JSON.stringify(ss.map(function(row) {
    var json = {}
    row.map(function(item, index) {
       json[title[index]] = item;
    });
    return json;
  }));
}
function backjson0(ssid,sheetname) {
//スプレッドシートのデータをJSONで返す officeの杜
//http://daichan4649.hatenablog.jp/entry/2014/02/08/160453
//スプレッドシートデータを取得する
  var sheet = SpreadsheetApp.openById(ssid).getSheetByName(sheetname);
  var ss = sheet.getDataRange().getValues();
  //タイトル行を取得する
  var title = ss.splice(0, 1)[0];
  //JSONデータを生成する
  return JSON.stringify(ss.map(function(row) {
  var json = {}
  row.map(function(item, index) {
  json[title[index]] = item;
  });
  return json;
  }));
}
function GetUser(){

  //スクリプトプロパティからシートのIDを取得
  var Properties = PropertiesService.getScriptProperties();
  var ssid = Properties.getProperty("sheetid");

  //アクセス中のユーザのメアドを取得
  var nowuser = Session.getActiveUser();
  //リターン値の初期値を格納
  var retman = "NG";
  var name = "";
 
  //承認リストの値を取得
  var ss = SpreadsheetApp.openById(ssid).getSheetByName("承認リスト").getRange("A2:B").getValues();
  var length = ss.length;

  //承認リストにメアドがあるか？探索
  var array = [];
  for(var i = 0;i<length;i++){
    //メアドが空白のものはスルーする
    if(ss[i][0] == ""){
      continue;
    }
    
    //User情報を照合し、あったらOKを返す
    if(nowuser == ss[i][0]){
      name = ss[i][1];
      retman = "OK";
    }
  }
  //値を返す

  return JSON.stringify([name,retman]);
  //https://officeforest.org/wp/2018/11/29/google-apps-script%E3%81%A7%E3%82%A6%E3%82%A7%E3%83%96%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E4%BD%9C%E6%88%90%E5%85%A5%E9%96%80/
}

